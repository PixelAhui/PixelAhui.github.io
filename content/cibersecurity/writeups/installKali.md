@pixelahui1

04 de enero de 2026

---

Hola, ¿Qué tal estas?, espero que estés bien y entusiasmado/a pues hoy comenzaremos con la configuración de tu máquina de Kali Linux para que puedas acceder a todas las herramientas de ciberseguridad con las que cuenta esta distribución de Linux, y que sigue siendo hoy en día una de las distribuciones más usadas y demandadas del mercado, además de ser la que tiene más tutoriales y documentación en Internet. Pero antes hay unos conceptos que debes tener en cuenta.

---
# Máquina Virtual y Nativa

Una máquina virtual o VM (Virtual Machine) es un entorno de software que emula una computadora completa, es decir, simula hardware (CPU, memoria, disco, red) para que pueda ejecutarse un sistema operativo y sus programas como si estuvieran en una máquina física real, pero sobre otro sistema anfitrión.

Mientras una máquina "nativa" es el hardware real, donde el sistema operativo se ejecuta directamente sin intermediarios.

## ¿Cómo funciona una máquina virtual?

Una VM se ejecuta sobre un **hipervisor**, que es el software encargado de asignar recursos físicos de la computadora nativa (CPU, RAM, disco), aislar cada VM del sistema anfitrión y **de otras VMs** y traducir o gestionar el acceso al hardware real.

Existen dos tipos principales de hipervisores para VMs.

- **Tipo 1 (Bare Metal):** Se instala directamente sobre el hardware físico de la computadora. Es usado en centros de datos (data centers)
- **Tipo 2 (Hosted o Alojado):** Se ejecuta como una aplicación sobre un sistema operativo host (VirtualBox y VMware Workstation) y es ideal para desarrollo y entornos de escritorio por su facilidad de uso, aunque menos eficiente que el tipo 1.

## Diferencias entre Máquina virtual y Máquina Nativa

| Característica    | Máquina Nativa       | Máquina Virtual                                                         |
| ----------------- | -------------------- | ----------------------------------------------------------------------- |
| Tipo de Ejecución | Sobre Hardware       | A través de hipervisor                                                  |
| Rendimiento       | Depende del Hardware | Ligera pérdida (aún con el mejor hardware)                              |
| Aislamiento       | Bajo                 | Alto                                                                    |
| Flexibilidad      | Bajo                 | Muy alta                                                                |
| Seguridad         | Depende del SO       | Aunque depende del SO instalado, al estar aislada no afecta a la nativa |
| Portabilidad      | Limitada             | Muy Alta (Gracias a la nube)                                            |
| Uso de recursos   | Exclusivo            | Compartido con la nativa                                                |
| Control de Fallos | Lenta                | Rápida, podemos restaurar la máquina rápidamente                        |
## Ventajas de una VM frente a una nativa

**1. Aislamiento**

Un fallo de configuración, virus o un error cualquiera en una VM no afecta al sistema anfitrión. Esto es importante debido a que en ciberseguridad lo último que queremos es comprometer nuestro equipo, entonces las máquinas virtuales nos permiten realizar laboratorios y análisis de malware sin el riesgo de infectar nuestra computadora.

**2. Portabilidad**

Una VM se puede transferir de una máquina nativa o host a otra, aunque el proceso puede ser algo complicado, esto es posible lo cual permite portabilidad. Pero además existen máquinas virtuales en la nube que podemos utilizar a través de internet.

**3. Ejecución de múltiples Sistemas Operativos**

Las máquinas virtuales nos permiten ejecutar múltiples sistemas operativos dentro de nuestra máquina nativa que actúa como host de todos estos sistemas operativos.

Esto es ideal para aprender sobre diversos sistemas operativos pudiendo experimentar versiones y distribuciones diferentes de Linux y de Windows, así como de otros SO que sean compatibles con nuestro hipervisor.

## Desventajas de una VM frente a una nativa

**1. Menor rendimiento**

Al ser una emulación de computadora dentro de otra computadora a través de software, su rendimiento puede llegar a ser muy lento sobre todo en cuestión de gráficos y ejecución de procesos en tiempo real (teniendo pequeños retrasos). Aunque con una configuración bien hecha esto debería ser poco perceptible para nosotros, pero depende también de nuestra computadora nativa.

**2. Mayor consumo de recursos**

Al ser una aplicación que emula una computadora, ejecutar una VM consume muchísimos recursos de la máquina nativa, dependiendo de nuestra configuración. Lo primero en donde podemos notar esto es la memoria RAM.

## ¿Por qué usar máquina virtual en Ciberseguridad?

El uso de máquinas virtuales en ciberseguridad es fundamental, por las ventajas anteriormente mencionadas, esto nos permite trabajar con distribuciones de Linux especialmente diseñadas para ciberseguridad como: **Kali Linux** y **ParrotOS Security**

Kali Linux y ParrotOS Security son distribuciones de Linux diseñadas especialmente para ciberseguridad, tanto para su estudio como para su ejecución en la práctica profesional, no están pensadas para ser usadas como un sistema operativo de uso cotidiano, como Windows, Debian, Ubuntu, macOS, etc.

Ejecutar Kali Linux y Parrot OS en nativo puede ser una práctica riesgosa o innecesaria. A continuación repasemos algunos beneficios de usar estas distribuciones en una máquina virtual.

### 1. Aislamiento y seguridad

Kali y Parrot incluyen herramientas que pueden manipular redes, inyectar paquetes, ejecutar exploits, interactuar con malware, etc. 

Todas estás herramientas pueden cambiar varias configuraciones de la computadora en el proceso y si algo sale mal pueden romper todo el sistema operativo.

Por ello usar Kali Linux y ParrotOS Security como sistema nativo puede comprometer toda la computadora si no se tienen los conocimientos adecuados. Y en una máquina virtual si hacemos algo mal no comprometemos a nuestra computadora directamente.

### 2. Entorno realista pero controlado

En ciberseguridad podemos y en ocasiones deberemos experimentar ataques de Man In The Middle, escaneo de puertos, fuerza y explotación de vulnerabilidades.

Las VMs permiten simular redes completas (víctima, atacante, servidor), crear laboratorios locales con varias máquinas y probar escenarios reales sin afectar redes externas.

### 3. Rollback

Si no tenemos mucho conocimiento y seguridad al momento de ejecutar un exploit desconocido, un script inestable o analizar un malware, en nuestra VM.

Podemos crear un snapshot y probar sin miedo estos elementos y si algo se rompe podemos regresar al momento antes de se rompiera nuestra VM. Esto es muy importante e ideal para experimentar sin miedo en el hacking ético.

### 4. Contención de malware

En Kali Linux y ParrotOS Security podemos realizar análisis dinámico de malware, ingeniería inversa o reversing, pruebas de ransomware, etc.

Las VMs nos permiten limitar el alcance del código malicioso, desconectar red, limitar permisos y simular diferentes víctimas. Siendo un estándar dentro del análisis forense.

### 5. Herramientas optimizadas para VM

Kali Linux y ParrotOS Security son distribuciones diseñadas para ser VM tanto que tienen imágenes oficiales para VirtualBox y VMware, drivers y herramientas preconfiguradas, así como una mayor estabilidad que una instalación nativa.

### 6. Evitar conflictos con el SO anfitrión

Kali Linux y ParrotOS Security muchas veces requieren permisos elevados frecuentemente para realizar diferentes configuraciones al momento de resolver laboratorios, CTFs, bug bounties o trabajo real. Por lo que tenerlas aisladas en una VM nos asegura que no rompan nuestro SO principal ya sea Windows, Linux o macOS.

---
# Instalación de VirtualBox

## Verificación de Virtualización en Windows 11

Algunas computadoras y laptops no tienen habilitada la virtualización en sus equipos esto impide que programas como VirtualBox y VMware operen correctamente, esto es algo raro de ver pero puede pasar. Para verificar la virtualización en Windows 11 podemos accionar las siguientes teclas.

```bash
[CTRL] + [SHITF] + [ESC]
```

Esto abrirá el administrador de tareas de Windows que luce algo así.

![Administrador de Tareas](../images/kali1.png)

Al ver esto hay que dar clic en la sección que diga *Rendimiento* que es el icono con la gráfica, al dar clic veremos lo siguiente.

![Rendimiento Windows](../images/kali2.png)

A continuación daremos clic en CPU y observaremos que la parte de *Virtualización* diga **Habilitado** si no lo dice será necesario entrar a la BIOS.

![CPU Virtualización](../images/kali3.png)

Activar la virtualización depende de la manufactura de cada computadora, por lo que debes saber si tu laptop cuenta con un procesador Intel o AMD, para poder activar la virtualización desde el BIOS.
## Proceso de instalación

Ahora que ya tenemos más conocimiento sobre que son las máquinas virtuales y su importancia para la práctica de la ciberseguridad empecemos instalando nuestro hipervisor.

En este caso en concreto instalaremos VirtualBox para Windows 11 para esto es tan fácil como escribir **VirtualBox** en nuestro navegador de conveniencia o acceder a este enlace.

[Oracle VirtualBox](https://www.virtualbox.org/)

Al dar clic acceder a la página de VirtualBox, que es la siguiente.

![VirtualBox website](../images/kali4.png)

A continuación para la descarga daremos clic en **Download**
![VirtualBox Download](../images/kali5.png)

A continuación centraremos nuestra atención en la sección que dice **VirtualBox Platform Packages**, en esta sección dare clic en el Sistema Operativo que tengamos instalado de forma nativa en nuestra computadora, y como mencionamos en este caso será Windows 11, por lo que daremos clic en **Window hosts**

A continuación se descargará un archivo .exe que es el instalador de VirtualBox para Windows.

![VirtualBox File](../images/kali6.png)

Daremos clic en **Abrir archivo** y seguiremos las instrucciones del instalador, como cualquier otro programa, al terminar de instalarse tendremos la siguiente aplicación.

![Abrir Archivo](../images/kali8.png)

Ahora ya tenemos instalado VirtualBox en nuestra computadora. Ahora continuemos con la instalación de Kali Linux.

---
# Instalación Kali Linux

Ahora para este momento podemos escoger entre dos opciones muy buenas para ciberseguridad basadas en Linux: **Kali Linux** y **Parrot OS**

Aunque Parrot es un sistema que se ha hecho cada vez más popular entre los iniciados de la ciberseguridad, así como profesionistas de está. En la industria se sigue utilizando Kali Linux debido a la cantidad de herramientas y documentación que se tiene con está distribución.

Kali Linux esta pensando para ser el SO estándar dentro de los especialistas de ciberseguridad, es decir toda aquella persona que quiera ser pentester o analista de incidentes. Sin embargo debido a esto, Kali no está pensado para ser SO de uso diario si no como una herramienta para ser usada e incluso desechada una vez que ya cumplió su propósito.

A diferencia de Parrot que es más flexible al poder ser instalado como VM o Live (nativo), esto debido a que es más ligero (menos herramientas) y esta pensado para ser usado tanto por especialistas en ciberseguridad (tanto red y blue team), como desarrolladores de software. Pero Parrot es todo un mundo que merece su propio artículo y consejos.

%% ARTICULO PARROT OS %%

*Enlaces para Kali y Parrot*

[Kali Linux | Penetration Testing and Ethical Hacking Linux Distribution](https://www.kali.org/)

[Parrot Security](https://www.parrotsec.org/)

Entremos al enlace de Kali Linux empecemos con la instalación de esta distribución.

![Administrador de Tareas](../images/kali9.png)

Damos clic en Download, al dar clic aparecerá la siguiente pantalla.

![Administrador de Tareas](../images/kali10.png)

A continuación demos clic en Virtual Machines, y aparecerá esta otra pantalla

![Administrador de Tareas](../images/kali11.png)

Y damos clic en VirtualBox que es nuestro caso, las otras opciones son plataformas de virtualización también, pero en esta ocasión solo nos enfocaremos en VirtualBox.

Al terminar de descargarse veremos que es un archivo comprimido .7z

![Administrador de Tareas](../images/kali12.png)

Lo que haremos a continuación será descomprimir este archivo. Al descomprimir y explorar en la carpeta tendremos los siguientes dos archivos.

![Administrador de Tareas](../images/kali13.png)

A continuación nos iremos a VirtualBox y daremos clic en **Open**.

![Administrador de Tareas](../images/kali14.png)

Y buscaremos la carpeta de descargas donde se encuentra nuestra máquina de Kali

![Administrador de Tareas](../images/kali16.png)

Y la seleccionaremos y ya tendremos la máquina.

![Administrador de Tareas](../images/kali17.png)

Al dar clic en iniciar aparecerá esto

![Administrador de Tareas](../images/kali18.png)

Debemos esperar y a continuación se mostrará la pantalla de inicio de sesión de Kali Linux

![Administrador de Tareas](../images/kali19.png)

Por defecto las credenciales de inicio son: **kali**, tanto para user como para password.

![Administrador de Tareas](../images/kali20.png)

Por defecto la pantalla se puede ver o muy pequeña o muy grande, para cambiar esto podemos ir a la sección de **Ver** de arriba a la izquierda y cambiar hasta que se ajusta a como lo queremos.

Y con todo esto ya tendríamos todo listo para empezar a usar Kali Linux en nuestra computadora, sin tener que configurar nada más.

