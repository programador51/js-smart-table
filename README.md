js-smart-table allows you
* Tabulate data
* Paginate
* Sort 
    * API Sort (if the API allows it)
    * Client side **TO BE RELEASED**
* Do a "reference" to an specific row.

![video-demo](https://res.cloudinary.com/dmtvwe2ur/image/upload/v1623768202/js-smart-table/smart-table_okaib2.gif)

To use this, it's just that simple doing an instance and passing an object as argument to set
the configuration of the table. But fisrt, some information.

---

## Tabulate data
This library will have many 'themes' to display the data.
For now, this is the list of themes available for Tabulate data
* default

---

## Paginate
Also, you can add pagination to avoid full the screen with innecesary data
For now, this is the list of themes available for Paginate
* default

---

## Sort
There 2 ways to sort the data on the table.

### sort-client-side (to be released)
This order the data acording to the clicked column. But will order just the "x" data that was fetched from the source. 

For instance.
You requested "users" from an API, that returned you the first 30 registers, well, the library will sort just that 30 registers.
This sort it's good when the SQL Gestor of the API doesn't implements sorting according to the parameters that receives by the http methods.

In resumen, use this one in case the API can't sort the data by himself

### sort-sql-side
The sort it's done by the API. So, the code just calls the API passing the arguments by URL Params.

In resumen, use this one in case you know the configuration that we will need on the section "How to use" for this sort way.

---

## Do a "reference" to an specific row.
When you click a row, you "save" the data on the instance of the table. So you can open a form and fill the inputs with that data or do whatever you want. You can do actions doing reference to that data.

--- 

## HOW TO USE

In order this works fine, need to pass an object as argument to the instance of the theme table we want to
use. Let's get started.

First, **check** the type definition of **APIConfig**.

# Example configuration

```typescript

const configuration: APIConfig = {
        idTable: 'users-info',
        idPagination: 'pagination-users-info',
        urlParams,
        pages: assignatures.pages,
        actualPage: assignatures.actualPage,
        rows: assignatures.assignatures,
        headerConfig: header,
        styleTable: 'default',
        sort,
        idRows: 'idAssignature',
        cbSelection,
        paginationFn,
        attributesResponse
    }

```

Let's checkout out one by one.

---

1. ##### idTable:string
You need to create a `table` tag and add the id attribute (value doesn't matter)

**Example**
```html
<table id="users-info"></table>
```

This attribute must match with that one of the html file.

```typescript

const configuration: APIConfig = {
        idTable: 'users-info',
        ...
    }

```

---

2. ##### idPagination:string
You need to create a `div` tag with an id attibute (value doesn't matter)

**Example**
```html
<div id="pagination-users-info" class="default-pagination"></div>
```

This attribute must match with that one of the html file.

```typescript

const configuration: APIConfig = {
        idPagination: 'pagination-users-info',
        ...
    }

```

---

3. ##### urlParams?:string
In case you want to add custom url params, you can do it. This it's fine when you wanna filter data

**Example**

```typescript

const configuration: APIConfig = {
        urlParams: '&hora=2&plan=401',
        ...
    }

```

4. ##### pages:number
The api must respons with the number of pages for the amount of data to be able create the pagination

**Example**

```typescript

const configuration: APIConfig = {
        pages: 20,
        ...
    }

```

---

5. ##### actualPage:number
The api must respons which page correspons the fetched data.

**Example**
```typescript

const configuration: APIConfig = {
        actualPage: 13,
        ...
    }

```

---

6. ##### rows:Array[object]
The api must has an attribute that contains a JSON with the fetched data

**Example**

```typescript

const configuration: APIConfig = {
        rows: [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
        },
        ...
    ]
        ...
    }

```

--- 

7. ##### headerConfig:HeaderConfig
Please, **check** the type definition of **HeaderConfig** for more information. (Global > Right Side)

---

8. ##### style:string
The theme that gonna have the table

**Valid values**
* 'default'

**Example**

```typescript

const configuration: APIConfig = {
        styleTable: 'default',
        ...
    }

```

---

9. ##### headerConfig:HeaderConfig
Please, **check** the type definition of **Sort** for more information. (Global > Right Side)

---

10. ##### idRows:string
When the table is printed, the `tr` can have an id attibute.
Which value must be set here? One of the attribute name that you get from the response. For example.

If your JSON response looks like this.

```javascript
{
    "id": 8,
    "email": "lindsay.ferguson@reqres.in",
    "first_name": "Lindsay",
    "last_name": "Ferguson",
    "avatar": "https://reqres.in/img/faces/8-image.jpg"
}
```

You can put on this attribute the values of
* id
* email
* first_name
* last_name
* avatar

---

11. ##### cbSelection
Please, **check** the method of **cbSelection** for more information. (Global > cbSelection)

---

12. ##### paginationFn
Please, **check** the method of **paginationFn** for more information. (Global > paginationFn)

---

13. ### attributesResponse
Please, **check** the type definition of **attributesResponse** for more information. (Global > Right Side)

---