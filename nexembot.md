# Conversation Engine v0.1 — documentación corregida

Esta documentación define la arquitectura funcional de la librería de motor conversacional v0.1.

El objetivo es que un LLM especializado o agente de código pueda implementar la librería completa manteniendo un diseño simple, trazable, extensible y entendible.
El código escrito debe ser 100% en inglés, aplicando solid y las mejores prácticas.

La documentación corrige el alcance anterior y consolida estas decisiones:

- Los steps son especializados y extensibles.
- Las actions no son steps obligatorios; se ejecutan mediante operations.
- Las branches pueden ejecutar operations y luego navegar a otro step.
- Las opciones de menú tienen branches propias.
- ConditionStep es la única forma oficial de expresar lógica condicional de flujo.
- Los flows pueden llamar a otros flows y compartir variables.
- Las operations y actions pueden ser asincrónicas a nivel de implementación, pero los cambios de conversación se aplican cuando el resultado vuelve al runtime.
- Las variables pueden tener scopes y mantener historial interno.
- Custom operations con contratos explícitos forman parte del diseño.
- Human handoff avanzado forma parte del sistema como capacidad modelable.
- LLM tiene dos roles separados: interpretación semántica del input y generación dinámica de respuestas.

## Índice

1. Visión general
2. Principios arquitectónicos
3. Modelo conceptual
4. Entidades del dominio
5. Modelo de variables, scopes e historial
6. Steps y handlers
7. Branches, routes y targets
8. Operations
9. Actions
10. Menús y opciones
11. Input processing y tareas semánticas
12. ConditionStep
13. Flow calls
14. Respuestas y generación LLM
15. Human handoff
16. Runtime y ciclo de ejecución
17. Ejecución asincrónica y commit de estado
18. Eventos y trazabilidad
19. Persistencia y repositorios
20. Extensibilidad
21. Validación del modelo
22. Escenario de referencia
23. Guía para agentes de código

---

# 01. Visión general

La librería define un motor conversacional para ejecutar flujos de chatbot de manera controlada, trazable y extensible.

El sistema debe permitir conversaciones determinísticas, conversaciones híbridas y conversaciones asistidas por LLM sin convertir el LLM en el dueño del flujo.

La unidad central es el Flow. Un Flow contiene Steps. Cada Step tiene un tipo especializado y es ejecutado por un StepHandler. Los Steps producen outcomes. Los outcomes activan branches. Las branches ejecutan operations y luego navegan a otro Step, finalizan, permanecen en el mismo Step o llaman otro Flow.

El runtime debe poder resolver casos como:

- Enviar uno o varios mensajes.
- Mostrar menús con opciones.
- Capturar texto libre.
- Validar entradas determinísticamente.
- Procesar adjuntos.
- Setear variables.
- Leer variables para decisiones.
- Ejecutar operaciones y acciones.
- Manejar fallos de acciones con branches.
- Invocar otros flows.
- Generar respuestas dinámicas con LLM.
- Clasificar o interpretar input con LLM solo cuando el Step lo declara.
- Derivar a un humano.
- Registrar eventos y trazas suficientes para entender cada turno.

El sistema no debe depender de nombres humanos para ejecutar lógica. Las referencias funcionales usan identificadores internos. Las etiquetas humanas solo sirven para lectura, edición y trazabilidad.

La documentación está escrita en español para el equipo, pero los nombres técnicos de clases, interfaces, métodos y artefactos deben implementarse en inglés.

---

# 02. Principios arquitectónicos

## 1. Steps especializados

Un Step representa un estado conversacional con comportamiento propio. Existen tipos de Step para comportamientos frecuentes: MessageStep, MenuStep, InputStep, AttachmentStep, ConditionStep, EndStep y CustomStep.

Cada tipo de Step se implementa mediante un StepHandler.

## 2. Operations transversales

Una Operation representa un efecto ejecutable. Una Operation no es necesariamente un Step.

Ejemplos de Operation:

- Enviar mensaje.
- Setear variable.
- Limpiar variable.
- Ejecutar una action.
- Emitir evento.
- Llamar otro Flow.
- Iniciar handoff humano.
- Ejecutar operación custom.

Cualquier Step o Branch puede ejecutar operations.

## 3. Branches explícitas

Una Branch define qué hacer ante una salida concreta del sistema.

Una Branch puede:

- Ejecutar operations.
- Navegar a otro Step.
- Quedarse en el mismo Step.
- Finalizar la conversación.
- Llamar otro Flow.
- Encadenar rutas según resultados de operations.

## 4. Actions como contratos de integración

Una Action representa una integración o tarea externa. Se ejecuta mediante RunActionOperation.

Action no es obligatoriamente un Step. Si en el futuro se desea un ActionStep visual, debe ser una comodidad construida sobre RunActionOperation.

## 5. Condición centralizada

La lógica condicional de flujo debe vivir en ConditionStep.

No se deben repartir condiciones en rutas, operaciones y transitions de forma dispersa, porque eso reduce trazabilidad.

Un ConditionStep evalúa variables, datos de estado o resultados previos y produce un outcome trazable.

## 6. Variables compartidas y con scope

Las variables representan el estado conversacional. La implementación debe soportar scopes, pero el scope por defecto debe ser compartido a nivel de conversación.

Flows llamados desde otro Flow deben poder compartir variables con el Flow invocador.

## 7. LLM separado por rol

El LLM puede usarse para dos tareas distintas:

- SemanticInputResolver: interpretar input del usuario y producir outcomes o valores permitidos.
- LlmResponseGenerator: redactar respuestas dinámicas usando variables y restricciones permitidas.

Estas funciones no deben mezclarse.

## 8. Asincronía controlada

Las actions y operations pueden ejecutarse de forma asincrónica a nivel técnico. El runtime debe esperar el resultado y recién entonces aplicar cambios al ConversationState.

La conversación se actualiza de forma controlada, luego de recibir el resultado de la operación.

## 9. Trazabilidad completa

Cada turno debe producir eventos y una DecisionTrace.

La trace debe permitir responder:

- Qué Step estaba activo.
- Qué input entró.
- Qué se resolvió.
- Qué variables se leyeron o escribieron.
- Qué operations se ejecutaron.
- Qué action respondió.
- Qué outcome se produjo.
- Qué Branch se tomó.
- Qué mensajes se generaron.
- Qué Step quedó activo al final.

---

# 03. Modelo conceptual

El modelo conceptual tiene cinco piezas centrales.

## Flow

Define una conversación o proceso conversacional completo.

Contiene:

- Variables.
- Steps.
- Actions.
- Responses.
- Settings.

## Step

Representa un punto especializado del flujo.

Un Step puede ser:

- MessageStep.
- MenuStep.
- InputStep.
- AttachmentStep.
- ConditionStep.
- EndStep.
- CustomStep.

Cada Step produce un resultado y posiblemente un outcome.

## Branch

Representa qué hacer después de una salida concreta.

Puede estar asociada a:

- Una opción de menú.
- Un outcome de input.
- Un outcome semántico.
- Un resultado de action.
- Una rama de ConditionStep.
- Una operación custom.

## Operation

Representa un efecto ejecutable.

Ejemplos:

- SendMessageOperation.
- SetVariableOperation.
- UnsetVariableOperation.
- RunActionOperation.
- CallFlowOperation.
- EmitEventOperation.
- HandoffOperation.
- CustomOperation.

## Runtime

Ejecuta steps, branches y operations.

El runtime no debe conocer la lógica interna de cada tipo de Step. Debe delegar en StepHandlers y OperationHandlers registrados.

## Flujo de procesamiento

El ciclo conceptual es:

1. El runtime recibe input o inicia conversación.
2. Carga el estado de conversación.
3. Obtiene el Step activo.
4. Delega la ejecución al StepHandler correspondiente.
5. El StepHandler procesa input, envía mensajes, evalúa condiciones o ejecuta lógica propia.
6. El StepHandler produce un StepResult.
7. Si hay Branch, el runtime ejecuta sus operations.
8. Si una operation produce resultado con branch, se ejecuta la branch correspondiente.
9. El runtime aplica variable changes y eventos.
10. El runtime navega al siguiente Step, finaliza o espera input.
11. Se registra la DecisionTrace.

---

# 04. Entidades del dominio

## ConversationFlowDefinition

Representa la definición de un Flow.

Debe incluir:

- Flow identifier.
- Nombre o label humano.
- Start step.
- Variables.
- Steps.
- Actions.
- Responses.
- Settings.

## FlowVersion

Representa una versión ejecutable de un Flow.

Debe incluir:

- FlowVersion identifier.
- Flow identifier.
- Version.
- Status.
- Definition.
- Schema version.
- Checksum opcional.
- Datos de creación y publicación.

La conversación debe ejecutarse contra una FlowVersion concreta.

## StepDefinition

Representa un Step tipado.

Debe incluir:

- Step identifier.
- Step type.
- Label opcional.
- Description opcional.
- Config específica del tipo.
- Operations de entrada.
- Operations de salida.
- Routes.

Los Step types built-in iniciales son:

- message.
- menu.
- input.
- attachment.
- condition.
- end.
- custom.

## StepHandler

Ejecuta un tipo de Step.

Debe poder:

- Validar la configuración del Step.
- Ejecutar el Step al entrar.
- Procesar input si el Step espera input.
- Devolver StepResult.

## StepBranch

Representa una salida ejecutable.

Debe incluir:

- Operations.
- Target.
- Metadata opcional.

## StepRoute

Representa una ruta desde un Step.

Debe incluir:

- Match por outcome o siempre.
- Branch.
- Priority opcional.

No debe contener condiciones complejas. Las condiciones complejas pertenecen a ConditionStep.

## StepTarget

Representa el destino después de una Branch.

Destinos mínimos:

- Ir a otro Step.
- Permanecer en el Step actual.
- Finalizar conversación.
- No navegar.

## ResponseDefinition

Representa una respuesta reutilizable.

Contiene un ResponsePlan.

## ActionDefinition

Representa un contrato de integración.

Debe describir:

- Tipo de action.
- Esquemas de entrada y salida.
- Outcomes posibles.
- Error codes.
- Configuración técnica.

## VariableDefinition

Representa una variable disponible para el Flow.

Debe declarar:

- Tipo.
- Scope.
- Valor por defecto opcional.
- Sensibilidad opcional.
- Validadores opcionales.

---

# 05. Modelo de variables, scopes e historial

Las variables son el estado conversacional principal.

## VariableStore

El VariableStore mantiene los valores actuales de la conversación.

Debe permitir:

- Leer variable.
- Setear variable.
- Limpiar variable.
- Verificar existencia.
- Obtener snapshot.

## Scopes

El sistema debe soportar scopes de variables. El scope por defecto debe ser conversation.

Scopes recomendados:

| Scope | Uso |
|---|---|
| conversation | Variable compartida por toda la conversación y por flows llamados. |
| flow | Variable local a una ejecución de Flow cuando se requiera aislamiento. |
| operation | Valor temporal usado durante ejecución de operations. |
| system | Variable reservada por el runtime o integraciones. |

Aunque el scope conversation sea el más común, la arquitectura debe permitir scopes más avanzados.

## Flow calls y variables compartidas

Cuando un Flow llama a otro Flow, ambos deben poder compartir variables de scope conversation.

Esto permite que un Flow de validación, un Flow de contacto o un Flow de identificación escriba variables que luego son usadas por el Flow invocador.

## VariableValue

Cada valor debe incluir:

- Variable identifier.
- Value.
- Source.
- Timestamp opcional.
- Metadata opcional.

Fuentes posibles:

- user_input.
- menu_selection.
- attachment.
- action_result.
- operation.
- semantic_input_task.
- llm_response_generation.
- system.
- flow_call.

## VariablePatch

Los cambios de variables se expresan como patches.

Tipos mínimos:

- set.
- unset.
- invalidate.

Aunque v0.1 puede empezar con set y unset, invalidate debe estar disponible para casos de corrección, recálculo o limpieza lógica.

## Variable history

El sistema debe poder mantener historial interno de variables.

El historial permite responder:

- Qué valor tenía antes.
- Qué valor tiene ahora.
- Qué operación lo cambió.
- Qué Step estaba activo.
- Qué turno produjo el cambio.
- Qué fuente generó el nuevo valor.

El historial no debe complicar el uso normal de variables, pero debe estar disponible para trazabilidad, debugging y auditoría.

## Regla de diseño

Las variables no deben modificarse directamente desde handlers de bajo nivel. Los handlers deben producir VariablePatches o eventos. El StateReducer aplica esos cambios al estado.

---

# 06. Steps y handlers

## StepDefinition

Cada Step tiene:

- Type.
- Config.
- OnEnter operations.
- OnExit operations.
- Routes.

El type determina qué StepHandler lo ejecuta.

## StepHandler

El StepHandler encapsula el comportamiento de un tipo de Step.

Debe implementar conceptualmente:

- validate.
- enter.
- handleInput, si el Step puede esperar input.

## Built-in StepHandlers

### MessageStepHandler

Responsable de enviar uno o varios mensajes.

Puede usar:

- StaticResponsePlan.
- TemplateResponsePlan.
- GeneratedResponsePlan.
- ResponseReferencePlan.

Produce normalmente outcome next.

### MenuStepHandler

Responsable de mostrar opciones y resolver selección.

Debe soportar:

- Selección por botón.
- Selección por número.
- Selección por texto exacto.
- Selección por aliases.
- Selección semántica opcional mediante LLM.

Cada MenuOption tiene Branch propia.

### InputStepHandler

Responsable de capturar y validar input.

Debe soportar:

- Texto libre.
- Valores estructurados.
- Extractores.
- Validadores.
- Tareas semánticas con LLM.
- Comandos globales si están habilitados.

### AttachmentStepHandler

Responsable de capturar y validar adjuntos.

Debe soportar:

- Requerido u opcional.
- Validación por MIME type.
- Validación por extensión.
- Validación por tamaño.
- Guardado de referencia en variable.

### ConditionStepHandler

Responsable de evaluar lógica condicional.

Es la única forma oficial de ramificar por condiciones.

Debe producir un outcome trazable.

### EndStepHandler

Responsable de finalizar la conversación o marcarla con estado final.

### CustomStepHandler

Permite implementar nuevos tipos de Step.

Debe seguir el mismo contrato que los StepHandlers built-in.

## StepResult

Todo StepHandler devuelve StepResult.

Debe contener:

- Status.
- Outcome opcional.
- Branch opcional.
- Messages opcionales.
- Variable patches opcionales.
- Events opcionales.
- Wait state opcional.
- Error opcional.
- Trace fragment.

---

# 07. Branches, routes y targets

## StepBranch

StepBranch es una de las entidades más importantes del sistema.

Define qué ocurre después de una selección, outcome o resultado.

Una Branch puede:

- Ejecutar operations.
- Navegar a otro Step.
- Permanecer en el Step actual.
- Finalizar conversación.
- Invocar otro Flow.

## Usos de StepBranch

Una Branch puede aparecer en:

- MenuOption.
- StepRoute.
- ConditionBranch.
- ActionResultBranch.
- CustomOperation result.
- Handoff result.

## StepRoute

StepRoute conecta un outcome producido por un Step con una Branch.

Debe usar match por outcome o always.

No debe contener condiciones complejas. Toda condición explícita debe ir a ConditionStep.

## StepTarget

Un Target indica qué ocurre después de ejecutar la Branch.

Targets mínimos:

- step: navegar a otro Step.
- stay: permanecer en el Step actual.
- end: finalizar conversación.
- none: no navegar.

Para flow calls, la operación que llama al Flow puede tener sus propias branches de retorno.

## Branches en opciones de menú

Cada opción de menú debe tener Branch propia.

Ejemplo conceptual:

- Opción Consulta técnica:
  - Setea motivoConsulta.
  - Envía mensaje inicial.
  - Navega al Step que pide DNI.

- Opción Consulta de facturación:
  - Setea motivoConsulta.
  - Navega al Step que pide texto libre.

- Opción Contactar asesor:
  - Setea motivoConsulta.
  - Navega a un menú de canal de contacto.

## Branches en resultados de actions

RunActionOperation puede tener branches por resultado.

Ejemplo conceptual:

- success:
  - Setea outputs.
  - Navega a mensaje de confirmación.

- not_found:
  - Envía mensaje de error.
  - Navega al Step anterior.

- error:
  - Envía mensaje temporal.
  - Navega al menú principal.

---

# 08. Operations

Una Operation representa un efecto ejecutable dentro de un Step, Branch o ruta de resultado.

Las Operations son transversales. No pertenecen exclusivamente a un tipo de Step.

## Operations built-in recomendadas

### SendMessageOperation

Envía un mensaje usando un ResponsePlan.

Puede usarse en:

- OnEnter.
- OnExit.
- Branch.
- ActionResultBranch.
- HandoffBranch.

### SetVariableOperation

Setea una variable en el VariableStore.

Debe producir VariablePatch y evento variable_set.

### UnsetVariableOperation

Elimina o limpia una variable.

Debe producir VariablePatch y evento variable_unset.

### InvalidateVariableOperation

Marca una variable como inválida o fuerza recálculo lógico.

Debe usarse en correcciones, cambios de datos o limpieza de estado.

### RunActionOperation

Ejecuta una ActionDefinition.

Debe soportar:

- Input mapping.
- Output mapping.
- Result variable opcional.
- Branches por resultado.

### CallFlowOperation

Invoca otro Flow dentro de la misma conversación.

El Flow llamado comparte las variables según scope.

Debe poder tener branches por resultado de la llamada.

### EmitEventOperation

Emite un evento técnico o de negocio.

### HandoffOperation

Inicia o gestiona handoff humano.

Puede crear un ticket, abrir una cola, registrar un canal o producir un estado handoff.

### CustomOperation

Permite extensiones con contrato explícito.

## OperationHandler

Cada tipo de Operation debe tener un OperationHandler.

Un OperationHandler debe:

- Validar si puede ejecutar la Operation.
- Ejecutar la Operation.
- Devolver OperationResult.
- Producir trace fragment.
- No modificar estado directamente.

## OperationResult

Debe incluir:

- Status.
- Outcome opcional.
- Branch opcional.
- Messages opcionales.
- Variable patches.
- Events.
- Error.
- Trace fragment.

## Fallos de operations

Cuando una operation falla, el flujo debe poder decidir qué hacer.

RunActionOperation y CustomOperation deben poder declarar branches por resultado.

Eso permite:

- Enviar mensaje.
- Mostrar menú.
- Volver a pedir input.
- Finalizar.
- Derivar a humano.
- Llamar otro Flow.

---

# 09. Actions

Una Action representa una integración, servicio externo o tarea de negocio.

Action no es obligatoriamente un Step.

Se ejecuta mediante RunActionOperation.

## ActionDefinition

Debe definir:

- Action identifier.
- Kind.
- Input schema.
- Output schema.
- Result outcomes.
- Error codes.
- Side effect flag opcional.
- Timeout opcional.
- Configuración técnica.

## Action kinds

Kinds sugeridos:

- local.
- http.
- queue.
- tool.
- webhook.
- handoff.
- custom.

## ActionExecutor

ActionExecutor recibe una ActionDefinition y los inputs ya resueltos.

Debe delegar en ActionHandler.

Debe devolver ActionResult.

## ActionHandler

Implementa una familia de actions.

Ejemplos:

- HttpActionHandler.
- LocalActionHandler.
- QueueActionHandler.
- ToolActionHandler.
- HandoffActionHandler.

## ActionResult

Debe incluir:

- Status.
- Outcome opcional.
- Outputs.
- Error code.
- Error message.
- Raw result opcional.
- Metadata.

## Asincronía

Una Action puede ejecutarse asincrónicamente a nivel técnico.

El runtime debe esperar el resultado de la Action antes de aplicar cambios al estado conversacional.

La conversación se actualiza después de recibir ActionResult.

## Manejo de fallos

RunActionOperation debe poder definir branches para:

- success.
- error.
- timeout.
- error codes específicos.
- outcomes específicos.

Esto permite que cualquier Step responda ante fallos de acción sin requerir ActionStep.

---

# 10. Menús y opciones

MenuStep representa un punto donde el bot muestra opciones y espera una selección.

## MenuStepConfig

Debe incluir:

- Prompt.
- Options.
- Selection policy.
- Invalid selection behavior.
- Unknown selection behavior.

## MenuOption

Cada opción debe incluir:

- Option identifier.
- Label.
- Description opcional.
- Aliases opcionales.
- Value opcional.
- Branch.

La Branch de una opción define exactamente qué ocurre cuando el usuario elige esa opción.

## SelectionPolicy

Debe permitir configurar:

- Botones.
- Selección por número.
- Texto exacto.
- Aliases.
- Texto libre.
- Selección semántica opcional.

## Selección semántica

Si está habilitada, el LLM puede mapear texto libre a una de las opciones disponibles.

El LLM no debe inventar opciones. Solo puede elegir entre opciones declaradas.

## Operaciones por opción

Una opción puede ejecutar:

- SetVariableOperation.
- SendMessageOperation.
- RunActionOperation.
- CallFlowOperation.
- HandoffOperation.
- EmitEventOperation.

Luego navega al Target de la Branch.

## Ejemplo conceptual

Menú principal:

- Consulta técnica:
  - Setea motivoConsulta.
  - Envía mensaje introductorio.
  - Navega al input de DNI.

- Consulta de facturación:
  - Setea motivoConsulta.
  - Navega a input de consulta libre.

- Comunicarme con agente:
  - Setea motivoConsulta.
  - Navega a menú de canal de contacto.

## Menús dinámicos

La lógica para construir opciones dinámicas puede vivir en la implementación del cliente o en un StepHandler custom.

El core no necesita una abstracción pesada de fuentes dinámicas para el caso base. Sin embargo, el diseño debe permitir que un MenuStep reciba options ya resueltas al momento de ejecutarse o que un CustomStep maneje ese caso.

---

# 11. Input processing y SemanticInputTask

InputStep procesa entradas del usuario.

## InputContract

Debe definir:

- Accepted input types.
- Bindings.
- Global commands.
- Semantic tasks.
- Invalid behavior.
- Unknown behavior.

## InputBinding

Un InputBinding conecta un input con una variable.

Debe incluir:

- Target variable.
- Source.
- Required flag.
- Normalizers.
- Extractors.
- Validators.
- Save raw input flag.

## Normalizers

Transforman input antes de extraer.

Ejemplos:

- trim.
- lowercase.
- uppercase.
- collapse spaces.

## Extractors

Extraen valores.

Ejemplos:

- regex.
- number.
- email.
- phone.
- date.
- raw text.

## Validators

Validan valores extraídos.

Ejemplos:

- required.
- integer.
- min length.
- max length.
- regex.
- email.
- enum.

## SemanticInputTask

Permite usar LLM para tareas semánticas de input.

Debe tener:

- Mode.
- Allowed outcomes.
- Threshold.
- Variable donde guardar outcome opcional.
- Variables permitidas opcionales.
- Prompt hint opcional.

## Modos mínimos

### after_invalid_input

Se usa cuando el input no pudo resolverse determinísticamente.

Ejemplo:

El Step espera DNI. El usuario escribe que quiere hablar con una persona. El LLM puede clasificarlo como handoff si ese outcome está permitido.

### after_valid_capture

Se usa cuando el input textual fue capturado y validado, y luego se necesita clasificarlo.

Ejemplo:

El Step pide una consulta de facturación. El usuario escribe una consulta libre. El texto se guarda y luego el LLM clasifica el área.

## Regla de seguridad

SemanticInputTask solo puede producir outcomes declarados.

Si produce variables, solo puede escribir variables permitidas y esos valores deben pasar por validación si corresponde.

---

# 12. ConditionStep

ConditionStep es la única forma oficial de expresar lógica condicional de flujo.

No se deben agregar condiciones complejas dentro de rutas, operations o branches. Esto mejora trazabilidad y legibilidad.

## Responsabilidad

ConditionStep debe:

- Leer variables.
- Evaluar condiciones declarativas.
- Producir un outcome.
- Ejecutar la Branch correspondiente.
- Registrar qué condición se evaluó y cuál matcheó.

## ConditionBranch

Cada branch del ConditionStep debe incluir:

- Branch identifier.
- ConditionExpression.
- Outcome.
- StepBranch.

## Default branch

ConditionStep debe poder tener una default branch.

Se usa cuando ninguna condición matchea.

## ConditionExpression

Expresiones mínimas:

- equals.
- not equals.
- exists.
- not exists.
- greater than.
- less than.
- includes.
- matches regex.
- and.
- or.
- not.

## Ejemplo conceptual

ConditionStep evaluar área de facturación:

- Si areaFacturacion es error_cobro:
  - Outcome error_cobro.
  - Branch hacia gestión de error de cobro.

- Si areaFacturacion es deuda:
  - Outcome deuda.
  - Branch hacia información de deuda.

- Default:
  - Outcome otro.
  - Branch hacia mensaje genérico.

## Trazabilidad

La DecisionTrace debe registrar:

- Variables leídas.
- Condiciones evaluadas.
- Resultado de cada condición.
- Branch seleccionada.
- Outcome producido.

---

# 13. Flow calls

El sistema debe poder llamar otro Flow desde una Operation.

No debe tratarse como un concepto separado de negocio ni como un sistema distinto. Es una forma de reutilizar flujos.

## CallFlowOperation

CallFlowOperation invoca otro FlowVersion.

Debe permitir:

- FlowVersion target.
- Input mapping opcional.
- Output mapping opcional.
- Branches por resultado.
- Compartir variables según scope.

## Variables compartidas

Por defecto, las variables de scope conversation deben ser compartidas entre el Flow llamador y el Flow llamado.

Esto permite que un Flow de identificación escriba dni, clienteId o clienteValido y que el Flow principal continúe usándolos.

## Estado de ejecución

El runtime necesita saber qué Flow está activo y cómo volver al Flow llamador.

La implementación puede usar una pila de ejecución o un mecanismo equivalente.

Esta estructura es de control de flujo, no de scope de variables.

## Resultado de Flow llamado

Un Flow llamado puede terminar con estados como:

- completed.
- cancelled.
- failed.
- handoff.

CallFlowOperation debe poder mapear esos resultados a Branches.

## Casos de uso

- Identificación de usuario.
- Validación de identidad.
- Recolección de datos de contacto.
- Confirmación final.
- Encuesta de satisfacción.
- Derivación a agente.

---

# 14. Respuestas y generación LLM

El sistema debe soportar respuestas estáticas, respuestas con variables y respuestas generadas por LLM.

## ResponsePlan

Tipos mínimos:

- StaticResponsePlan.
- TemplateResponsePlan.
- GeneratedResponsePlan.
- ResponseReferencePlan.

## StaticResponsePlan

Texto fijo.

Uso:

- Saludos.
- Prompts simples.
- Errores conocidos.

## TemplateResponsePlan

Texto con variables.

Uso:

- Confirmaciones.
- Estados.
- Respuestas estructuradas.

## GeneratedResponsePlan

Respuesta redactada por LLM.

Debe definir:

- Goal.
- Allowed variables.
- Constraints.
- Style opcional.
- Max length opcional.
- Fallback text.

## Reglas para LlmResponseGenerator

El LLM de respuesta puede:

- Redactar de forma natural.
- Usar variables permitidas.
- Adaptar tono y longitud.
- Resumir información disponible.

No puede:

- Cambiar variables.
- Decidir navegación.
- Ejecutar actions.
- Inventar datos de negocio.
- Usar variables no permitidas.

## Uso con operaciones

SendMessageOperation puede usar cualquier ResponsePlan.

MessageStep puede contener uno o varios ResponsePlan.

Branches pueden enviar respuestas antes de navegar.

---

# 15. Human handoff

Human handoff forma parte del sistema.

Puede modelarse como una Operation, una Action kind, un EndStep con status handoff o una combinación de esas piezas.

## HandoffOperation

Debe permitir:

- Crear solicitud de handoff.
- Definir canal o cola.
- Enviar metadata.
- Guardar identificador de handoff en una variable.
- Enviar mensaje al usuario.
- Finalizar conversación con status handoff o navegar a otro Step.

## Handoff mediante Action

También puede modelarse como RunActionOperation usando una ActionDefinition de kind handoff.

Esto permite integrar:

- CRM.
- Sistema de tickets.
- Inbox humano.
- Canal de chat externo.
- Email.
- Cola de atención.

## Branches de handoff

El resultado puede tener branches:

- success.
- unavailable.
- error.

Cada branch puede enviar mensajes, navegar o finalizar.

## Variables comunes

Variables típicas:

- handoffId.
- handoffChannel.
- handoffQueue.
- handoffReason.
- assignedAgentId.

## Trazabilidad

La DecisionTrace debe registrar:

- Motivo de handoff.
- Step desde donde se disparó.
- Operation o Action usada.
- Resultado.
- Variables seteadas.
- Mensajes enviados.
- Estado final.

---

# 16. Runtime y ciclo de ejecución

## ConversationEngine

Es la fachada pública.

Debe permitir:

- Iniciar conversación.
- Procesar input de usuario.
- Procesar evento externo si la implementación lo soporta.
- Devolver estado, mensajes, eventos y trace.

## TurnProcessor

Procesa un turno completo.

## Ciclo base

1. Recibir input o iniciar conversación.
2. Cargar ConversationState.
3. Cargar FlowVersion.
4. Obtener Step activo.
5. Obtener StepHandler por Step type.
6. Ejecutar enter o handleInput.
7. Recibir StepResult.
8. Ejecutar Branch si existe.
9. Ejecutar Operations de la Branch.
10. Resolver branches de operation si aplica.
11. Aplicar VariablePatches.
12. Registrar eventos.
13. Resolver siguiente Step.
14. Actualizar ConversationState.
15. Crear OutboundMessages.
16. Crear DecisionTrace.
17. Devolver ProcessTurnResult.

## Waiting input

Si un Step necesita esperar usuario:

- El estado queda waiting_input.
- pendingInput referencia el Step y su InputContract.
- El siguiente input será procesado por ese Step.

## Avance automático

Algunos Steps pueden avanzar sin input:

- MessageStep.
- ConditionStep.
- EndStep.
- Steps custom automáticos.

El runtime debe poder ejecutar Steps automáticos hasta llegar a waiting_input o estado final.

## Manejo de branches

La Branch puede provenir de:

- Opción de menú.
- Outcome de InputStep.
- Outcome semántico.
- ConditionBranch.
- Resultado de Operation.
- Resultado de Action.

---

# 17. Ejecución asincrónica y commit de estado

El framework debe soportar operaciones asincrónicas a nivel técnico.

Ejemplos:

- Llamar una API HTTP.
- Consultar un CRM.
- Crear un ticket.
- Iniciar handoff.
- Enviar datos a un servicio externo.
- Generar respuesta con LLM.

## Regla principal

La operación puede ser asincrónica, pero el estado conversacional se actualiza cuando el runtime recibe el resultado.

Esto significa:

- OperationHandler puede ejecutar lógica asincrónica.
- ActionExecutor puede esperar una promesa o tarea asincrónica.
- El runtime no debe aplicar variable changes antes del resultado.
- Cuando llega el resultado, se aplican patches, events, messages y branch correspondiente.

## Fallos asincrónicos

Si una operación asincrónica falla, debe devolver OperationResult o ActionResult con error.

La branch correspondiente debe poder:

- Enviar un mensaje.
- Volver a otro Step.
- Mostrar un menú.
- Finalizar.
- Intentar otra operación.
- Disparar handoff.

## Diferencia con background workflows

La v0.1 no necesita modelar workflows de fondo complejos para soportar asincronía básica.

El caso principal es: el TurnProcessor espera la operación, recibe resultado y actualiza conversación.

Si una implementación necesita background jobs, puede agregarlos como extensión manteniendo el mismo contrato de resultado.

---

# 18. Eventos y trazabilidad

El sistema debe registrar eventos y construir DecisionTrace.

## ConversationEvent

Representa algo que ocurrió.

Eventos mínimos:

- conversation_started.
- turn_started.
- input_received.
- step_entered.
- step_completed.
- step_failed.
- menu_option_selected.
- input_resolved.
- input_invalid.
- semantic_input_task_started.
- semantic_input_task_completed.
- llm_response_generation_started.
- llm_response_generation_completed.
- variable_set.
- variable_unset.
- variable_invalidated.
- operation_started.
- operation_completed.
- operation_failed.
- action_started.
- action_completed.
- action_failed.
- message_created.
- transition_taken.
- condition_evaluated.
- flow_call_started.
- flow_call_completed.
- handoff_started.
- handoff_completed.
- conversation_completed.
- conversation_cancelled.
- error_raised.

## DecisionTrace

Debe explicar cada turno.

Debe incluir:

- Step inicial.
- Input recibido.
- Resolver usado.
- Validators ejecutados.
- SemanticInputTasks ejecutadas.
- LLM usado para input.
- LLM usado para respuesta.
- Variables leídas.
- Variables escritas.
- Branch seleccionada.
- Operations ejecutadas.
- Action results.
- ConditionStep evaluado.
- Flow calls.
- Handoff.
- Mensajes generados.
- Step final.
- Estado final.

## TraceFragment

Cada servicio debe aportar fragmentos de trace.

Ejemplos:

- InputProcessor aporta resultado de extracción.
- ConditionEvaluator aporta condiciones evaluadas.
- ActionExecutor aporta resultado de action.
- ResponseRenderer aporta mensaje generado.
- OperationExecutor aporta operaciones ejecutadas.

## Objetivo

Un humano o LLM implementador debe poder reconstruir por qué el bot hizo exactamente lo que hizo.

---

# 19. Persistencia y repositorios

La librería debe poder ejecutarse con persistencia desacoplada.

## Repositorios recomendados

### FlowRepository

Responsable de guardar y obtener FlowVersion.

### ConversationRepository

Responsable de guardar Conversation y ConversationState.

### EventRepository

Responsable de guardar ConversationEvents.

### TraceRepository

Responsable de guardar DecisionTrace.

## Persistencia mínima

Para una primera implementación se puede usar persistencia en memoria.

El contrato debe permitir luego reemplazarla por:

- Base relacional.
- Document store.
- Storage propio del cliente.
- Persistencia embebida.

## Estado

ConversationState debe guardar:

- Conversation identifier.
- FlowVersion identifier.
- Current step.
- Variables.
- Pending input si existe.
- Status.
- Last user input opcional.
- Last outbound messages opcional.

## Eventos

Los eventos deben guardarse como registros append-only cuando la implementación lo permita.

## Trazas

DecisionTrace puede guardarse por turno.

Sirve para debugging, testing, auditoría y análisis.

---

# 20. Extensibilidad

La arquitectura debe permitir extender el sistema sin modificar el runtime central.

## StepHandlerRegistry

Permite registrar nuevos tipos de Step.

Ejemplos:

- PaymentStep.
- SurveyStep.
- AuthenticationStep.
- RagAnswerStep.
- CustomBusinessStep.

## OperationRegistry

Permite registrar nuevas Operations.

CustomOperation debe tener contrato explícito.

Un CustomOperation debe definir:

- Tipo.
- Config esperada.
- Inputs.
- Outputs.
- Outcomes posibles.
- Cómo produce trace.
- Cómo reporta errores.

## ResolverRegistry

Permite agregar resolvers de input.

Ejemplos:

- RegexResolver.
- EmailResolver.
- PhoneResolver.
- MenuOptionResolver.
- SemanticInputResolver.
- DomainSpecificResolver.

## ValidatorRegistry

Permite agregar validadores.

Ejemplos:

- CuitValidator.
- DniValidator.
- PostalCodeValidator.
- CustomExternalValidator.

## ActionHandlerRegistry

Permite ejecutar diferentes tipos de actions.

Ejemplos:

- HTTP.
- Local.
- Queue.
- Tool.
- Handoff.
- CRM.

## LLM providers

SemanticInputResolver y LlmResponseGenerator deben poder usar distintos proveedores.

La librería no debe depender de un vendor específico.

---

# 21. Validación del modelo

El sistema necesita validaciones básicas para evitar errores estructurales.

No se requiere un compilador enterprise complejo para v0.1, pero sí validación mínima.

## Validaciones recomendadas

- Start step existe.
- Todos los targets apuntan a Steps existentes.
- Todas las variables referenciadas existen.
- Todas las actions referenciadas existen.
- Todas las responses referenciadas existen.
- Cada Step tiene handler registrado.
- Cada Operation tiene handler registrado.
- Cada MenuOption tiene Branch.
- Cada ConditionStep tiene branches.
- Cada InputStep tiene InputContract.
- Cada AttachmentStep tiene target variable.
- Cada RunActionOperation tiene ActionDefinition válida.
- Cada GeneratedResponsePlan define fallbackText.
- ConditionStep usa expresiones válidas.

## Validación de trazabilidad

Debe verificarse que cada StepHandler y OperationHandler produzca trace fragments suficientes.

## Validación de LLM

SemanticInputTask debe declarar allowedOutcomes.

GeneratedResponsePlan debe declarar allowedVariableIds y fallbackText.

## Validación de actions

ActionDefinition debe declarar resultOutcomes o errorCodes suficientes para que RunActionOperation pueda rutear resultados relevantes.

## Resultado de validación

Debe producir:

- Issues de error.
- Issues de warning.
- Entidad afectada.
- Mensaje claro.

---

# 22. Escenario de referencia

Este escenario sirve como prueba base para implementar el motor.

## Inicio

El bot envía:

- Hola.
- Gracias por comunicarte.

Luego muestra menú:

- Consulta técnica.
- Consulta de facturación.
- Comunicarme con agente.

## Consulta técnica

Al seleccionar Consulta técnica:

- Setea motivoConsulta como consulta_tecnica.
- Envía mensaje introductorio.
- Pide DNI.
- El DNI debe ser número.
- Si es válido, guarda dni.
- Si es inválido, envía mensaje de error y vuelve a pedirlo.

## Consulta de facturación

Al seleccionar Consulta de facturación:

- Setea motivoConsulta como consulta_facturacion.
- Pregunta cuál es la consulta.
- Guarda el texto libre.
- Ejecuta SemanticInputTask para clasificar el área.
- Guarda areaFacturacion.
- Pasa a ConditionStep para decidir rama.

## Comunicarme con agente

Al seleccionar Comunicarme con agente:

- Setea motivoConsulta como contactar_agente.
- Muestra menú:
  - Contactarme con asesor humano.
  - Contactarme por mail.

Si elige humano:

- Setea canalContactoAsesor como humano.
- Ejecuta handoff o action correspondiente.
- Envía mensaje.
- Termina con status handoff.

Si elige mail:

- Setea canalContactoAsesor como mail.
- Puede pedir email o enviar mensaje según la definición del Flow.
- Termina completed o continúa con otro Step.

## Qué debe validar este escenario

- MessageStep con varios mensajes.
- MenuStep con options.
- Option branches.
- SetVariableOperation.
- InputStep con validación determinística.
- SemanticInputTask after_valid_capture.
- ConditionStep.
- HandoffOperation o RunActionOperation.
- DecisionTrace completa.

---

# 23. Guía para LLMs y agentes de código

Esta guía indica cómo implementar la librería sin desviarse del diseño.

## Orden recomendado de implementación

1. Implementar tipos de dominio.
2. Implementar ConversationState y VariableStore.
3. Implementar ResponseRenderer para static y template.
4. Implementar StepHandlerRegistry.
5. Implementar MessageStepHandler.
6. Implementar MenuStepHandler.
7. Implementar InputProcessor básico.
8. Implementar InputStepHandler.
9. Implementar ConditionEvaluator.
10. Implementar ConditionStepHandler.
11. Implementar OperationExecutor.
12. Implementar SetVariableOperation.
13. Implementar SendMessageOperation.
14. Implementar RunActionOperation y ActionExecutor.
15. Implementar EndStepHandler.
16. Implementar TraceBuilder.
17. Implementar ConversationEngine y TurnProcessor.
18. Agregar GeneratedResponsePlan con LlmResponseGenerator.
19. Agregar SemanticInputTask con SemanticInputResolver.
20. Agregar AttachmentStepHandler.
21. Agregar CallFlowOperation.
22. Agregar HandoffOperation.
23. Agregar CustomOperation con contratos.

## Reglas de implementación

- No modificar estado directamente desde StepHandlers.
- StepHandlers deben devolver StepResult.
- OperationHandlers deben devolver OperationResult.
- StateReducer aplica patches y cambios.
- Todo cambio relevante debe emitir evento.
- Todo turno debe crear DecisionTrace.
- ConditionStep es la única forma oficial de condicionar lógica de flujo.
- Actions se ejecutan mediante RunActionOperation.
- Menús resuelven opciones y ejecutan la Branch de la opción.
- LLM de input no genera mensajes.
- LLM de respuesta no cambia estado.
- Flow calls comparten variables según scope.

## Señales de diseño incorrecto

- Un StepHandler que decide rutas complejas internamente sin exponer outcome.
- Una Action que modifica ConversationState directamente.
- Un LLM que decide próximos Steps sin pasar por outcomes permitidos.
- Condiciones escondidas dentro de routes.
- Branches que no dejan trace.
- Operations que no devuelven resultado estructurado.

---

