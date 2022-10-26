---
title: 'Nueva tienda para albertoballesteros.com: Eleventy y Snipcart'
description: 'Un sitio web rápido y seguro - ¡y con una apariencia que lo refleja! - es crucial para un shop. albertoballesteros.com es un sitio web estático basado en el método de Jamstack.'
key: 'storealberto'
date: 2022-02-15
image: './src/assets/images/blog/shop.jpg'
alt: 'Pantallazo del shop de albertoballesteros.com'
cta:
  title: '¿Necesitas una tienda?'
  desktop: 'El trabajo y el dinero invertidos en un sitio web de tienda rápido, atractivo y seguro siempre merecen la pena. Se reflejará en las ventas, y los costes incurridos al principio se recuperarán pronto.'
  lead: '¿Tienes un proyecto en mente y no sabes cómo llevarlo a cabo? ¡Hablemos de ello! Envíame un correo a [hola@lenesaile.com](mailto:hola@lenesaile.com) y cuéntame tus ideas.'
---

L@s visitantes de una tienda están a punto de decidir si quieren un producto y si están dispuestos a pagar dinero por él. Los tiempos de carga y la preocupación por la seguridad de la tienda pueden hacer que abandonen ese plan.

Ponte en el lugar de tus clientes: ¿Darías datos personales e información de pago a una página web de aspecto dudoso? ¿A un sitio web que no desprende confianza por todas partes? Probablemente no.

Por eso, una web rápida y segura - ¡y con una apariencia que lo refleja! - es crucial para un shop. [albertoballesteros.com](https://www.albertoballesteros.com/shop) es una página web estática basado en el método de Jamstack. Si se hace todo bien, las páginas de Jamstack son intrínsecamente muy seguras, fiables, flexibles y, sobre todo, rápidas.

## ¿Cómo se puede integrar una tienda en una página web de Jamstack?

Una de las muchas ventajas del método Jamstack es el amplio abanico de aplicaciones y plataformas que se pueden implementar. Dependiendo de lo que necesite un proyecto, puedo elegir un proveedor que ofrezca exactamente eso.

En el caso de una tienda online, puedo elegir entre muchos proveedores que permiten a los usuarios tener una experiencia de compra moderna, personal y rápida.

Uno de los proveedores más populares es [Shopify](https://www.shopify.com/). Se paga una pequeña cuota mensual por utilizarlo. A cambio, recibimos un sistema de tienda seguro y fácil de usar con conexiones sencillas a los proveedores de pago habituales, herramientas de marketing y capacidad de ampliación modular. El área de administración donde podemos introducir los datos de la empresa, añadir productos y procesar los pedidos es algo que todos los proveedores similares tienen en común.

Para albertoballesteros.com, Shopify es demasiado potente. Tenemos un número manejable de productos, y la tienda es más bien un complemento del sitio web.

Hasta ahora, hemos mantenido una conexión directa con Stripe para una función de shop. [Stripe Checkout](https://stripe.com/es/payments/checkout) es un método seguro e inmediato para completar compras puntuales o suscripciones, por ejemplo. Si podemos suponer que nuestra visitante sólo comprará un producto (por ejemplo, porque no hay más productos disponibles o porque elige una subscripción específica de pago), Stripe Checkout es ideal. Stripe se queda con alrededor de un 3% por compra completada y ofrece a cambio una variedad de monedas, soporte para facturas, seguridad y encriptación de datos, etc., similar a Shopify.

Por nuestra parte, sin embargo, vamos a ampliar la gama de productos un poco y es posible que un comprador quiera comprar más de un artículo a la vez. Y así entra en juego un tercer proveedor: [Snipcart](https://snipcart.com/).

## Integración técnica de Snipcart con Eleventy

Snipcart es una solución de comercio electrónico que nos permite añadir un carrito de la compra a una página web y convertirlo en una tienda. Snipcart ofrece un carrito de la compra totalmente personalizable, webhooks y APIs, y un panel de administración intuitivo. Se quedan con un 2 % por transaccion + gastos de la pasarela de pago.

{% imagePlaceholder "./src/assets/images/blog/snipcart-dashboard.jpg", "", "", "", "Pantallazo del panel de administración de Snipcart", "Snipcart tiene un panel de administración atractivo y claro. Entre otras cosas, puedo encontrar información útil sobre el fenómeno de las cestas de la compra abandonadas." %}

Para Snipcart no importa la plataforma en la que esté construido el sitio web. Sin embargo, funciona especialmente bien con una página web de Jamstack. [albertoballesteros.com](https://www.albertoballesteros.com/shop) es una página Jamstack, construida con el generador de webs estáticas [Eleventy](https://www.11ty.dev/).

Lo mejor es que la configuración de los productos se hace directamente en el código de la web.
Para ello, primero tenemos que incluir un archivo de Javascript y otro de CSS.

En mi carpeta del proyecto tengo la siguiente estructura (simplificada):

{% raw %}

```md
proyecto
│
└───src
│ │
│ └───_data
│ │ │ shop.json
│ │ │ ...
│ │
│ └───_includes
│ │ │
│ │ └───layouts
│ │ │ base.njk
│ │ │ ...
│ │
│ │ shop.njk
│ │ ...
│ ...
```

{% endraw %}
Para evitar que el Javascript y el CSS sea cargado innecesariamente por otras páginas, especifico en mi plantilla base que sólo se incluirá en la página de la tienda:

_En base.njk:_

{% raw %}

```html
{% if snipcart %}
<link
  rel="stylesheet"
  href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
/>
<script async src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"></script>
<div hidden id="snipcart" data-api-key="YOUR_PUBLIC_API_KEY"></div>
{% endif %}
```

{% endraw %}

La tienda no necesita sub-páginas de productos, sino que lista los artículos directamente con una breve descripción.

Por lo tanto, sólo activo la integración en mi archivo <code>Nunjucks</code> para la tienda:

_En shop.njk:_
{% raw %}

```html
---
title: Shop
snipcart: true
---
```

{% endraw %}

Obtenemos los productos y sus propiedades a través de un archivo <code>json</code>:

_En shop.json:_

```json
{
  "products": [
    {
      "name": "Libro El verano más largo",
      "type": "Libro",
      "description": "Los textos de los que se compone este libro los escribí entre los meses de septiembre y noviembre. Lo mío es escribir canciones, grabar discos y hacer conciertos. El verano más largo son apuntes con forma de poemas que me apetecía compartir",
      "id": "libro-verano",
      "price": "12.00",
      "image": "/assets/images/shop/libro-verano.jpg"
    },
    {
      // ...
    }
  ]
}
```

Snipcart necesita algunos datos necesarios para crear los productos y procesar la compra.
Obtenemos estos datos de nuestro archivo <code>shop.json</code> utilizando un "loop":

{% raw %}

```html
{% for product in shop.products %}
<button
  class="snipcart-add-item"
  id="{{ product.id }}"
  data-item-id="{{ product.id }}"
  data-item-price="{{ product.price }}"
  data-item-url="/shop/"
  data-item-description="{{ product.description }}"
  data-item-image="{{ product.image }}"
  data-item-name="{{ product.name }}"
>
  añadir al carrito
</button>
{% endfor %}
```

{% endraw %}

Este <code>button</code> es suficiente para activar Snipcart. Se requiere el nombre del producto, un ID de producto único, el precio del producto, la URL del producto (donde se encuentra el <code>button</code> "añadir al carrito", utilizado por su rastreador cuando comprueba la integridad del pedido), la descripción del producto y la URL de la imagen del producto.

La clase CSS <code>snipcart-add-item</code> también es necesaria para que funcione.
Dentro del loop utilizo estos datos para mostrar los productos en la interfaz de usuario.

Para el "toggle" del carrito de la compra tenemos el siguiente código:

```html
<button class="snipcart-checkout">ver carrito</button>
```

Esto nos permite comprobar el estado de nuestra cesta de la compra sin añadir nada nuevo a ella.

También proporcionamos a los visitantes una visión general concisa de la cesta de la compra en el resumen de productos:

```html
Productos eligidos: <span class="snipcart-items-count"></span> Total:
<span class="snipcart-total-price"></span>
```

Aquí se puede ver siempre cuántos productos hay en la cesta y cuál sería el precio total en este momento. Esto funciona con una inyección de Javascript.

Snipcart también busca nuestro atributo de idioma en el HTML para ajustar automáticamente el idioma mostrado:

```html
<html lang="es"></html>
```

Para la mayor seguridad posible de nuestras webs, establecemos cabeceras de respuesta HTTP. La cabecera de la Política de Seguridad de Contenidos (CSP) es una capa adicional de seguridad que ayuda a detectar y mitigar ciertos tipos de ataques como el cross-site scripting (XSS) y los ataques de inyección de datos. Lo hacemos especificando exactamente qué recursos puede cargar el navegador.

Para que Snipcart funcione, tenemos que habilitar la recuperación de scripts a través de Snipcart en la cabecera de la Política de Seguridad de Contenidos.

Según hemos conseguido nuestra primera venta, consta el artículo automáticamente dentro de la sección de productos. El comprador está listado en la sección de clientes y en la sección de pedidos aparece la transacción con los detalles del cliente.

{% imagePlaceholder "./src/assets/images/blog/snipcart-ventas.jpg", "", "", "", "Pantallazo del panel de administración de Snipcart", "¡Hemos vendido el primer ejemplar del libro por medio de la página web! Ahora aparece el producto en el  panel de administración de Snipcart." %}

## Conclusion and recommendations: How to choose the best solution for an online store?

## Conclusión y recomendaciones: ¿Cómo elegir la mejor solución para una tienda online?

En este caso, manejo directamente la creación de los productos en el archivo <code>json</code>. Sin embargo, para clientes, esto sería bastante engorroso. En su lugar, pueden introducir los productos y sus propiedades en una hoja de Google (Excel) y luego convierto este formato en un archivo <code>json</code> que puedo utilizar directamente.

Cada cliente tiene necesidades individuales. Shopify es la primera opción para muchos por su flexibilidad, facilidad de uso y buena relación calidad-precio. Algunas grandes empresas también utilizan Shopify.

Para las páginas web de jamstack en las que la tienda es más bien un accesorio, Snipcart es una solución perfecta con su combinación de fácil configuración y profunda personalización.

Para una página de Wordpress, el propio plugin Woocommerce del CMS es un clásico. También es posible combinar Wordpress con otros soluciones de tiendas.

**En el momento de hacer una decisión hay que responder a las siguientes preguntas:**

- ¿Cuánto quieres pagar por una solución de shop? Deben incluirse los costes de desarrollo y los costes de funcionamiento (como la contribución mensual de Shopify.
- ¿Cuáles son tus conocimientos técnicos y los de tu equipo: ¿cuánto quieres y puedes montar tú mismo?
- ¿Qué te imaginas para la funcionalidad y la facilidad de uso de la tienda?
- ¿Qué tamaño tiene o tendrá tu tienda? Hay que considerar eso para la escalabilidad y adaptabilidad de la plataforma.