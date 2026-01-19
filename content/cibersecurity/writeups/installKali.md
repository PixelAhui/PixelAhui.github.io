# Instalación Kali Linux

@jokealex233

04 de enero de 2024

---

Hola, ¿Qué tal estas?, espero que estés bien y entusiasmado/a pues hoy comenzaremos con la configuración de máquina de Kali Linux para que puedas acceder a todas las herramientas de ciberseguridad con las que cuenta esta distribución de Linux, y que sigue siendo hoy en día una de las distribuciones más usadas y demandadas del mercado, además de ser la que tiene más tutoriales y documentación en Internet. Pero antes hay unos conceptos que debes tener en cuenta.

---
# Máquina Virtual y Nativa

Una máquina virtual o VM (Virtual Machine) es un entorno de software que emula una computadora completa, es decir, simula hardware (CPU, memoria, disco, red) para que pueda ejecutarse un sistema operativo y sus programas como si estuvieran en una máquina física real, pero sobre otro sistema anfitrión.

Mientras una máquina "nativa" es el hardware real, donde el sistema operativo se ejecuta directamente sin intermediarios.

## ¿Cómo funciona una máquina virtual?

Una VM se ejecuta sobre un **hipervisor**, que es el software encargado de asignar recursos físicos de la computadora nativa (CPU, RAM, disco), aislar cada VM del sistema anfitrión y **de otras VMs** y traducir o gestionar el acceso al hardware real.

Existen dos tipos principales de hipervisores para VMs.

- **Tipo 1 (Bare Metal):** Se instala directamente sobre el hardware físico de la computadora. Es usado en centros de datos (data centers)
- **Tipo 2 (Hosted o Alojado):** Se ejecuta como una aplicación sobre un sistema operativo host (VirtualBox y VMware Workstation) y es ideal para desarrollo y entornos de escritorio por su facilidad de uso, aunque menos eficiente que el tipo 1.