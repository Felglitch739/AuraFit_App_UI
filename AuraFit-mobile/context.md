# CONTEXTO DEL PROYECTO: AuraFit Mobile (React Native)

**Versión:** 0.2 — Reinicio post v0 fallida
**Fecha:** 2026-07-30
**Status:** 🟡 Reiniciando desde cero (v0 se descartó por deuda técnica acumulada)

Actúa como un Arquitecto de Software Senior y Product Engineer especializado en React Native / Expo. A continuación tenés el contexto completo del proyecto "AuraFit Mobile" — léelo con atención antes de tocar cualquier código, porque ya hay decisiones tomadas que no deben re-discutirse sin razón.

---

## 1. Qué es AuraFit y qué problema resuelve

AuraFit es una **app de fitness & wellness integral** — no solo un contador de calorías, sino una app que combina tres pilares en una sola experiencia:

1. **Nutrición inteligente**: en vez de que el usuario busque manualmente cada alimento, puede tomar una foto de su comida y la IA estima automáticamente las macros (proteína, carbos, grasas) y calorías.
2. **Entrenamiento personalizado con IA**: el usuario no elige entre rutinas genéricas — describe su objetivo, nivel, equipamiento disponible y días de la semana, y la IA genera una rutina real basada en ciencias del deporte (splits probados, escala RIR, límite de volumen por sesión).
3. **Wellness diario**: un check-in rápido de energía, sueño, estrés y ánimo, para que la app entienda el estado general del usuario, no solo sus números de gimnasio.

### El dolor que resuelve (resumen)

| Problema del usuario | Solución de AuraFit |
|---|---|
| Trackear macros a mano es tedioso | Foto de comida → IA estima macros |
| Rutinas genéricas no se adaptan a mí | IA genera rutina personalizada según mis datos reales |
| Tengo 5 apps distintas para todo esto | Una sola app: nutrición + ejercicio + wellness + progreso |
| Las apps de fitness son feas / complicadas | Diseño minimalista, "soft UI", sin fricción visual |

### Usuarios target

- **"Ana" (25-40 años)** — principiante/intermedio, quiere verse y sentirse bien sin ser competitiva, valora el diseño, tiene poco tiempo.
- **"Carlos" (28-35 años)** — intermedio/avanzado, ya usó MyFitnessPal/Strong y las encuentra incompletas, busca optimizar de verdad.

---

## 2. Historia del proyecto (por qué estamos donde estamos)

Esto importa porque explica varias decisiones abajo:

1. **v0 — App web con Laravel + Inertia.js + React**: la primera versión de AuraFit era un SaaS web (Laravel/PHP + MySQL + Inertia.js + React). Tenía un Dashboard, un Onboarding con generación de rutina vía OpenAI, y una Biblioteca de Ejercicios que originalmente consumía la API pública de Wger.
2. **Migración de datos de ejercicios**: se decidió dejar de depender de la API externa de Wger (poco confiable) y hacer un **import único** de sus fixtures open-source a una tabla MySQL propia (`exercises`), con seeder y controlador propios. Este backend YA EXISTE y funciona.
3. **Decisión de "destrozar" la web y pasar a app nativa**: se decidió que el futuro de AuraFit es una app móvil nativa (iOS + Android) con React Native, dejando Laravel como backend headless (API pura, sin Inertia).
4. **Intento v0 de la app móvil — FALLÓ**: se generó un primer intento en React Native (Expo) con un diseño "neumórfico" mal calibrado (sombras duras, artefactos visuales, contenido tapado) y, al intentar arreglar una dependencia desactualizada (`react-native-reanimated`) con `npm audit fix --force`, se rompió toda la cadena de compatibilidad entre Expo SDK y React Native. Sin commits de git de respaldo, se decidió **descartar ese intento y reiniciar desde cero** con documentos de planeación más rigurosos.
5. **Estamos acá**: reiniciando la app móvil desde cero, con lecciones aprendidas incorporadas a los documentos de planeación (ver sección 8).

---

## 3. Decisión arquitectónica clave: reescritura de UI, no migración de código

**No vamos a portar el código del frontend web actual a React Native.** El frontend web nació de templates y está muy acoplado a la arquitectura de Inertia.js (props inyectadas por request, rutas server-driven). Traducir eso línea por línea a RN costaría más que rehacerlo bien.

**La estrategia es:**
- La **UI de la app móvil se construye desde cero**, con su propio design system, pantalla por pantalla.
- Por ahora, la UI corre con **datos mock** tipados (mismo shape que la API real eventualmente devolverá).
- La **conexión con el backend Laravel existente se hace al final**, cuando la UI ya esté validada — no antes. Esto evita bloquear el desarrollo de UI esperando cambios de backend, y evita reescribir UI si el backend cambia de forma durante el proceso.
- El trabajo de "conectar" al final debería ser, idealmente, un simple swap: reemplazar las funciones mock del service layer por llamadas `fetch` reales — ver sección 6.

---

## 4. Stack técnico definido

| Capa | Tecnología | Nota |
|---|---|---|
| Framework móvil | **React Native + Expo (managed workflow)** | NO bare RN. Managed da OTA updates, EAS Build, y evita pelear con Xcode/Gradle localmente |
| Navegación | **Expo Router** | File-based routing, deep linking gratis |
| Estado del cliente | **Zustand** | Auth, paso de onboarding, estado de UI (modals, sheets) |
| Estado del servidor | **TanStack Query (React Query)** | Cache, refetch, loading states — pensado para cuando se conecte la API real |
| Estilos | **StyleSheet nativo + tokens propios** | Se evaluó NativeWind pero se prefirió StyleSheet + tokens para v1, mejor performance |
| Animaciones | **React Native Reanimated** | ⚠️ Ver sección 8 — cuidado con versión vs. SDK de Expo |
| Gráficas | Por definir — Victory Native quedó marcado como RIESGO (ver sección 8), evaluar `react-native-gifted-charts` como alternativa más liviana |
| Iconos | `@expo/vector-icons` (Ionicons) | Incluido en Expo |
| Cámara | `expo-camera` + `expo-image-picker` | Para análisis de foto de comida |

### Backend (ya existe, NO se toca todavía)

- **Laravel (PHP)**, servidor local con Herd Free
- **MySQL** (`aurafit`)
- Tabla `exercises` propia (poblada desde fixtures de Wger, ya no depende de la API externa)
- Prompts de IA (`weekly-plan.system.txt` / `weekly-plan.user.txt`) ya afinados con lógica de ciencias del deporte real (RIR, máx. 6 ejercicios/día, splits PPL/Upper-Lower/Full Body)
- **Pendiente para más adelante**: convertir controladores de Inertia a API Resources puros, instalar Laravel Sanctum en modo token (no cookies/SPA) para auth desde mobile

---

## 5. Features del MVP

### 🏠 Home / Dashboard
- Saludo personalizado + fecha
- Wellness Check-in diario (energía 1-5, horas de sueño, estrés 1-5, ánimo con emojis)
- Resumen de calorías (anillo de progreso) + mini-anillos de macros (proteína, carbos, grasas)
- Card de próximo entrenamiento con CTA "Iniciar"
- Mini-gráfico de actividad semanal

### 🏋️ Workouts
- Biblioteca de ejercicios (nombre, descripción, grupo muscular, imagen, filtros, buscador)
- Generador de rutinas con IA (formulario de preferencias → rutina completa con series/reps/descansos)
- Modo entrenamiento activo (ejercicio por ejercicio, timer de descanso, registro de peso/reps, resumen final)

### 🍎 Nutrition
- Registro de comidas por tipo (desayuno/almuerzo/cena/snacks)
- Análisis de foto de comida con IA (estimar macros, usuario puede ajustar)
- Búsqueda manual de alimentos
- Vista diaria de totales + objetivos configurables

### 📈 Progress
- Gráfica de peso corporal en el tiempo
- Historial de entrenamientos
- Tendencias de macros (semanal/mensual)
- Historial de wellness (energía, sueño, estrés)

### 👤 Profile
- Datos del usuario, objetivos, unidades (kg/lb, cm/in), cerrar sesión

### Transversales
- Bottom Tab Navigation: Home · Workouts · Nutrition · Progress · Profile
- Onboarding inicial (datos básicos + objetivos)
- 100% datos mock en esta fase

---

## 6. Fuera de scope del MVP (explícitamente NO construir todavía)

- Integración real con backend Laravel (se hace al final)
- Autenticación real (login se simula con mock; Sanctum viene después)
- Notificaciones push
- Wearables (Apple Watch, Fitbit)
- Social features (compartir, amigos, comunidad)
- Monetización / planes de pago
- Modo offline completo
- Dark mode (el design system debe contemplarlo a futuro, pero no se construye en v1)
- Internacionalización (solo español por ahora)
- Gamificación (badges, streaks) — nice-to-have v1.1
- Chat con entrenador
- Video de ejercicios (solo imágenes/animaciones por ahora)

---

## 7. Dirección visual: qué es y qué NO es el diseño de AuraFit

Esto es crítico porque ya se interpretó mal una vez (ver sección 8).

**Referencia visual válida:** el mockup `AuraFit_Distinct_Variations.png` (específicamente la Variación 01), NO interpretaciones libres del término "neumorfismo".

**Lo que SÍ es el estilo de AuraFit:**
- Fondo blanco puro, cards en gris muy claro, casi sin contraste con el fondo
- Bordes redondeados grandes y consistentes
- Sombras — si las hay — deben ser un blur MUY sutil, casi imperceptible
- Anillos de progreso circulares como elemento visual central (estilo Apple Fitness)
- Tipografía limpia, sans-serif, jerarquía clara (números grandes, labels chicos)
- Sensación general: "premium, minimalista, tranquilo" — no llamativo

**Lo que NO es el estilo de AuraFit:**
- Neumorfismo clásico marcado (sombra dual clara+oscura muy pronunciada, estilo Dribbble 2020) — se ve anticuado y en la v0 causó bugs de renderizado graves
- Sombras oscuras duras o bordes de contorno visibles alrededor de las cards
- Cualquier efecto que dependa de duplicar sombras (clara + oscura superpuestas) sin haberlo validado antes en un componente aislado

**Regla de implementación (aprendida por las malas):** el componente Card debe usar la sombra MÁS SIMPLE posible que se vea bien en Android, iOS y web simultáneamente — una sola sombra sutil (`shadowColor/shadowOffset/shadowOpacity/shadowRadius` en iOS, `elevation` bajo de 2-4 en Android), sin librerías de sombra dual. Probar en UN componente aislado, en Android real y en web, ANTES de replicar el patrón a todo el sistema.

---

## 8. Lecciones aprendidas de la v0 (NO repetir estos errores)

Estas son reglas operativas, no sugerencias — se derivan de fallas reales que ya ocurrieron:

1. **Git desde el día 1.** La v0 no tenía commits, así que cuando algo se rompió no había forma de volver atrás y hubo que descartar todo el trabajo. Regla: `git init` antes de instalar cualquier dependencia, commit después de cada milestone funcional (cada componente, cada pantalla que funciona).

2. **Nunca usar `npm audit fix --force` en un proyecto Expo.** Esto fue la causa raíz de la destrucción de la v0: fuerza actualizaciones de versión sin entender compatibilidad Expo SDK ↔ React Native, mezclando versiones incompatibles entre sí. Las vulnerabilidades que reporta `npm audit` en dependencias de desarrollo casi nunca son explotables en producción — no es una emergencia real.

3. **Cualquier actualización de dependencias nativas debe hacerse con `npx expo install [paquete]`**, nunca con `npm install` a secas ni con `npm audit fix`. `expo install` conoce la matriz de compatibilidad del SDK.

4. **Correr `npx expo-doctor` regularmente**, especialmente antes de instalar librerías con dependencias nativas pesadas (gráficas, cámara, animaciones).

5. **Validar compatibilidad con Expo Go ANTES de instalar** librerías que dependan de módulos nativos no estándar (ej. `react-native-skia`, del cual depende Victory Native en versiones recientes). Si algo requiere un dev client en vez de Expo Go estándar, hay que decidirlo conscientemente, no descubrirlo con un crash silencioso sin error en terminal.

6. **Probar en Android real Y en web antes de dar por bueno un componente visual.** El bug de sombras de la v0 se manifestó distinto en cada plataforma (web mostró manchas oscuras con contenido tapado; no se llegó a probar en Android antes del colapso de dependencias). No asumir que "se ve bien en un target" significa que se ve bien en todos.

7. **Un crash inmediato al abrir Expo Go, sin error visible en la terminal de Metro, es señal de incompatibilidad de módulo nativo**, no de un bug de JS — hay que sospechar de dependencias nativas nuevas primero, no de la lógica de la app.

---

## 9. Setup de testing / entorno de desarrollo

- **Desarrollo diario**: Expo Go + Android SDK (emulador o dispositivo Android físico)
- **iOS**: se testea en dispositivo físico de Eduardo (tiene iPhone + cuenta de Apple Developer activa)
- **Cuentas**: hay licencia de Apple Developer y cuenta de Google Play disponibles — ambas plataformas son first-class citizens desde el día 1, no hay limitación real de testing en ninguna
- **Editor**: VS Code para el backend Laravel; **Antigravity** (IDE agéntico de Google, Gemini 3) para el desarrollo de la app React Native, con capacidad de correr terminal/preview mientras escribe código
- Se evaluaron/instalaron **skills de skills.sh** para reforzar criterios de diseño mobile-first durante la generación de UI

---

## 10. Definition of Done — fase actual (solo UI, sin backend)

El MVP de UI se considera listo cuando:
- Las 5 pantallas principales (Home, Workouts, Nutrition, Progress, Profile) navegan sin errores
- Usan 100% datos mock, tipados según types compartidos (mismo shape que usará la API real)
- Pasan un review visual contra el design system en Android real, iOS real, Y web
- No hay errores ni warnings de `expo-doctor`
- El componente Card (y su sistema de sombra) fue validado aislado antes de aplicarse a todo el sistema

---

## 11. Próximo paso inmediato

1. `git init` limpio + primer commit
2. `npx create-expo-app` con la versión estable más reciente del SDK (sin forzar versiones)
3. Redactar/confirmar PRD v0.2, System Design v0.2 y Design System v0.2 incorporando todo lo de este documento
4. Instalar dependencias una por una vía `expo install`, con commit después de cada una
5. Construir y validar el componente Card (sombra simple) de forma aislada antes de avanzar
6. Recién ahí, construir pantalla por pantalla empezando por Home