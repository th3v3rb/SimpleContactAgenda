# Proyecto para registrar contactos

En este proyecto se desarrolla un sistema para registrar personas y sus contactos asociados. Se utilizará Laravel 11 junto con Inertia.js para la construcción del frontend.

## Base de datos

Los parámetros de la base de datos se cargan mediante el uso de seeders. Esto garantiza que la base de datos tenga datos iniciales consistentes para su funcionamiento.

## Registro de personas y contactos

Cada vez que se registra una persona en el sistema, automáticamente se genera un contacto asociado a esa persona. Esto asegura que cada persona tenga al menos un contacto registrado en el sistema.

## Advertencias sobre contactos principales

El sistema lanzará advertencias si no existe un contacto principal activo para un usuario. Esto ayuda a garantizar que cada usuario tenga al menos un contacto principal para poder comunicarse adecuadamente.

## Tecnologías utilizadas

- Laravel 11: Un potente framework de PHP para el desarrollo de aplicaciones web.
- Inertia.js: Una librería que permite construir aplicaciones de una sola página utilizando componentes de React en el frontend y Laravel en el backend.

Probando laravel 11 e inertia porque... por que no? :)
