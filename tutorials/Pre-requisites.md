In order this library works, you need:
* An API that allows:
    * Request an specific page of the data
    * Request order the data by a column (optional)
    * Request order the data ASC or DESC (optional)
    * Returns the page requested
    * Returns the data requested 
    * Returns the quantity of pages founded for the requested data (in order to paginate)

* Have a little experience using APIs

A good example of API that that complies this it's **[reqres.in](https://reqres.in/)**

On the next part of the tutorial, will be an example of how to use this library. You can use any API that complies the points touched above. 

You can use one of this APIS to follow the tutorial

* **[Assignatures (API that's gonna be used for the tutorial)](https://demo-js-smart-table.herokuapp.com/api/paso1/materias?pagina=1&orden=ASC&columna=nombreMateria&hora=0&plan=401)**
* **[reqres](https://reqres.in/api/users?page=1)**

---

In case that you want to use the API of assignatures and it's down, you can download it **[here](https://github.com/Luisrjm09/ADBD/tree/main/server)** and run it locally on your machine.

---

## Install the provided API (optional)
You can skip this if you preffer use **[reqres.in](https://reqres.in/)** or if the API of **Assignatures** stills online


1. Download the **[repository](https://github.com/Luisrjm09/ADBD)** and execute `npm i` to install the dependencies that needs the proyect. (Just for the server folder)

2. Install **[XAMPP](https://www.apachefriends.org/download.html)** 

3. Open MySQL with XAMPP and create a database named `siase`

4. Import the sql file named `siase.sql` that it's on the **[repository](https://github.com/Luisrjm09/ADBD)**

5. Open a terminal on the folder `server` of the downloaded repository and execute `npm run server`

If you get an error, you are free to edit the file `.env` that it's on the `server` folder in order to put the configuration of your XAMPP to stablish a correct connection.

Now, you can continue the next section using the same API.