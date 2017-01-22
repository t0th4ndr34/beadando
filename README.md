#
# Dokumentáció

**Matracbolt raktár bevételezés**

Készítette: Tóth Andrea

***1. Követelményanalízis***

**1.1. Célkitűzés, projektindító dokumentum**

A program legfőbb célja jól átláthatóan, és érthetően megjeleníteni a bolt raktárában megtalálható különböző matracokat és tulajdonságaikat egy webes vastagkliens, azaz egyoldali alkalmazás felhasználásával Az adatok védelme érdekében legyen lehetőség regisztrációra, majd bejelentkezésre. A bejelentkezett felhasználó a matracok listáját megtekintheti, bővítheti, meglévő elemeket törölhet illetve módosíthat.

*Funkcionális követelmények:*

- Regisztrációra
- Bejelentkezés
- Csak bejelentkezett felhasználók által elérhető funkciók
  - Új matrac felvételére a listába
  - A meglévő matracok szerkesztésére
  - A meglévő matracok törlésére

*Nem funkcionális követelmények:*

- Könnyű áttekinthetőség: Színekkel típus szerint csoportosítás
- Használhatóság: Könnyű áttekinthetőség, ésszerű elrendezés, könnyen kezelhetőség
- Megbízhatóság: jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
- Karbantarthatóság: könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt

**1.2. Szakterületi fogalomjegyzék**

Fajták:

- Rugós matrac: Rugókkal rendelkező matrac.
- Habszivacs matrac: Habszivacsból készült matrac.
- Fedőmatrac: Normál matrac tetejére való vékonyabb matrac.

Keménység: A matrac keménységéről tájékoztató adat, lehet: kemény, félkemény, puha.

**1.3. Használatieset-modell, funkcionális követelmények**

Vendég: Csak a publikus oldalakat éri el

- Főoldal
- Bejelentkezés
- Regisztráció
- Matracok böngészése

Bejelentkezett felhasználó: A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.

- Új matrac felvétele
- Matrac megtekintése
- Matrac szerkesztése
- Matrac törlése

![](/docs/images/nomnoml (2).png?raw=true)

Vegyünk példának egy egyszerű folyamatot:

Meglévő matrac szerkesztése:

1. A felhasználó az oldalra érkezve, bejelentkezik vagy regisztrál
2. Regisztráció után megtekintheti a matracokat listázó oldalt, ahol kiválaszthatja a szerkeszteni kívánt matracot.
3. Megnyomja a „Megtekintés&quot; feliratú gombot
4. A megtekintés oldalon kiválaszthatja a „Szerkesztés&quot; gombot
5. Szerkesztés oldalon felviszi az új adatokat
6. Küdés gombra kattintva elmenti a változásokat

![](/docs/images/nomnoml (1).png?raw=true)

***2. Tervezés***

**2.1. Architektúra terv**


**2.1.2. Oldaltérkép:**

Publikus:

- Főoldal
- Bejelentkezés
- Regisztráció
- Matracok böngészése
- Matrac 

Bejelentkezett:

- Főoldal
- Új matrac felvétele
- Listaoldal
    - Matrac törlése
    - Matrac szerkesztése


**2.1.3. Végpontok**

- Route.get('/', 'MatracController.main'): Főoldal
- Route.get('/matracok', 'MatracController.matracok'): Matracok böngészése
- Route.get('/matrac/create', 'MatracController.create').middleware('auth'): Matrac űrlap
- Route.post('/matrac/create', 'MatracController.doCreate').middleware('auth'): Matrac feltöltés

- Route.get('/matrac/:id', 'MatracController.show'): Matrac
- Route.get('/matrac/:id/edit', 'MatracController.edit'): Matrac szerkesztési űrlap
- Route.post('/matrac/:id/edit', 'MatracController.doEdit'): Matrac szerkesztés
- Route.post('/matrac/:id/delete', 'MatracController.doDelete'):  Matrac törlés

- Route.get('/register', 'UserController.register'): Regisztrációs űrlap
- Route.post('/register', 'UserController.doRegister'): Regisztráció

- Route.get('/login', 'UserController.login'): Bejelentkező űrlap
- Route.post('/login', 'UserController.doLogin'): Bejelentkezés
- Route.get('/logout', 'UserController.doLogout'): Kijelentkezés

**2.2. Felhasználói-felület modell**

*2.2.1.Oldalvázlatok:*
![](/docs/images/foold.jpg?raw=true)
![](/docs/images/bej.jpg?raw=true)
![](/docs/images/reg.jpg?raw=true)
![](/docs/images/ujm.jpg?raw=true)
![](/docs/images/matrlist.jpg?raw=true)
![](/docs/images/matracmegt.jpg?raw=true)

*2.2.2. Dizájntervek:*
![](/docs/images/1.png?raw=true)
![](/docs/images/2.png?raw=true)
![](/docs/images/3.png?raw=true)
![](/docs/images/4.png?raw=true)
![](/docs/images/5.png?raw=true)
![](/docs/images/6.png?raw=true)
![](/docs/images/7.png?raw=true)
![](/docs/images/8.png?raw=true)
*2.2.3. Osztálymodell*
 
 **Adatmodell**
 
![](/docs/images/adat.png?raw=true)
 
 **Adatbázisterv**
 
![](/docs/images/adat.png?raw=true)

 
***3. Implementáció***

**3.1.1. Fejlesztőkörnyezet**

Webes IDE: **ADONIS**

**3.1.2. Könyvtárstruktúra**
* **matracok**
  * **app**
    * **Commands**
    * **Http**
      * **Controllers**
        * _.gitkeep_
        * _MatracController.js_
        * _UserController.js_
      * **Middleware**
        * _kernel.js_
        * _routes.js_
    * **Listeners**
    * **Model**
      * **Hooks**
      * _Category.js_
      * _Matrac.js_
      * _Token.js_
      * _User.js_    
  * **bootstrap**
  * **config**
    * **express-admin*
      * _config.json_
      * _custom.json_
      * _settings.json_
      * _users.json_
    * _databas.js_  
  * **database**
    * **migrations**
      * _matracok.sqlite_    
  * **node_modules**
  * **public**
  * **resources**
    * **views**
      * _login.njk_
      * _main.njk_
      * _master.njk_
      * _matrac.njk_ 
      * _matracEdit.njk_ 
      * _matracCreate.njk_ 
      * _matracok.njk_
      * _register.njk_ 
  * **storage**
  * _package.json_
  * _server.js_

**4.4.Tesztesetek**
* User
  * Felhasználó létrehozása
  * Bejelentkezés jó, és rossz jelszóval
  * Főoldal láthatósága
  * Új matrac feltöltése oldal láthatósága
  * Csak bejelentkezett felhasználó által látható oldal láthatósága
  * Sikeres bejelentkezés

  
***5. Felhasználói dokumentáció***

**Futtatáshoz szükséges operációs rendszer:
** Tetszőleges operációs rendszer

**A futtatáshoz szükséges hardver:
** Operációs rendszerek szerint megadva

**Egyéb követelmények:
** Internet böngésző telepítése, JavaScript ajánlott

**Program telepítése**

* cmd megnyitása
  * cd Desktop
* git -clone [repository elérése]
* cd [létrejött könyvtár]
* npm install 
* .example.env fájl átnevezése .env-re
* indítás: npm start 
* debug: npm run dev

**Program használata:**

1. Böngészőben nyissuk meg a főoldalt
2. Jobb felső sarokban kattintsunk a Belépés feliratra
3. Belépés/Regisztráció után hozzáférünk jogokhoz.
4. Az Új matrac beküldése gombra kattintva tudunk új matracokat felvenni a listába
5. Töltsük ki az űrlapot
6. Hibás adatok esetén az űrlap jelezni fogja a hibát
7. A Matrac beküldése gombra kattintva mentsük el az adatokat
8. A matrac oldalán: Törlés gombra kattintva törölhetjük a matracot
9. A matrac oldalán: Módosítás gombra kattintva módosíthatjuk az adatokat

***6.	Fejlesztői dokumentáció:***

** A szerveroldali alkalmazás progresszív fejlesztése kliensoldali JavaScript segítségével

**  AJAX-os funkció:

* ajaxLogin:
	* AJAX-os bejelentkezés, létrehoz egy modális dialógusablakot, ahol meg lehet adni az emailt és a jelszót, a belépés gombra 	kattintva az /ajax/login oldalra küldi az űrlap tartalmát. Hibás adatok esetén kiírja, hogy sikertelen, a mégse gombra kattintva eltűnik a modális ablak.
  
![](/docs/images/ajaxlogin.jpg?raw=true)

* ajaxLogout:
	* AJAX-os kijelentkezés, egy modális ablakban megkérdezi a felhasználót, hogy biztosan ki akar-e jelentkezni, az Igen gombra kattintva megtörténik a kijelentkezés és eltűnik a modális ablak, a mégse gombra kattintva eltűnik a modális ablak és nem jelentkezik ki.
  
 ![](/docs/images/ajaxlogout.jpg?raw=true)
	
* ajaxDelete:
	* AJAX-os törlés, egy modális ablakban megerősítést kér a felhasználótól, hogy biztosan törli-e az adott matracot, az Igen gombra kattintva megtörténik a törlés és eltűnik a modális ablak, a mégse gombra kattintva eltűnik a modális ablak.

![](/docs/images/ajaxdelete.jpg?raw=true)

* ajaxCreate:
	* AJAX-os létrehozás, létrehoz egy modális dialógusablakot, ahol meg lehet adni az új matrac létrehozásához szükséges adatokat. Hibás adatok esetén jelez, ha pedig helyes adatokat adtunk meg eltűnik a modális ablak.

![](/docs/images/ajaxcreate.jpg?raw=true)

** Végpontok bővülése:**
~~~~
Route.group('ajax', function () {
    Route.post('/login', 'UserController.ajaxLogin')
    Route.get('/logout', 'UserController.ajaxLogout')
    Route.delete('/matrac/:id/delete', 'MatracController.ajaxDelete').middleware('auth')
    Route.post('/matrac/create', 'MatracController.ajaxCreate').middleware('auth')
}).prefix('/ajax')
~~~~

***7.	Tesztelés:***

* Funkcionális tesztelés [Selenium IDE-vel](https://addons.mozilla.org/hu/firefox/addon/selenium-ide/)
* A tesztekhez telepíteni kell a plugint
* A tesztek a tests mappában találhatóak
* Tesztesetek:
  * Rossz bejelentkezés - badaccount
  * Szerkesztés - edit
  * Jó bejelentkezés - login
  * Kijelentkezés - logout
  * Új matrac hozzáadása - new
  * Új matrac hozzáadása és eltávolítása - newandremove
  * Regisztráció - newregister
 


***8.	Irodalomjegyzék:***

http://webprogramozas.inf.elte.hu/alkfejl.php

http://webprogramozas.inf.elte.hu/alkfejl/A_dokumentacio_felepitese.pdf
