var currentPage;
var currentPageId;
var hash;
var objekti = document.createElement("object");
var ohjeOtsikko;

const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        //lisätään kuuntelija jokaiseen page-luokkaan kuuluvaan osioon (div)
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
            
           })
        
        
        //lisätään jokaiseen osiossa olevaan "nav-link"-tunnisteella merkittyyn listan elementtiin kuuntelija
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })
        //Asetetaan tilaksi (state) #home. Lisätään kuuntelija
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    //navigointi, valitaan currentpageksi data-targetin osoittama sivu
    nav: function(ev){
        
        ev.preventDefault();
        
        
        //luodaan lista tehtävistä instructions-osioon mikäli nykyinen sivu on instructions
        currentPage = ev.target.getAttribute('data-target');
       if(currentPage === "instructions") {
        showTasks();
       }
        //if-elseif lause ternary operaattorilla. Ts. lyhyempi versio perinteisestä if-else-lauseesta. Palauttaa valitun linkin perusteella sivun.
        currentPage = currentPage === "jsperusteita" ? tasks(): currentPage === "perusteita" ? tasks(): currentPage === 'Tavoitteet' ? tasks()  : currentPage === "tehtava1" ? tasks() : currentPage === "tehtava2" ? tasks() : currentPage === "tehtava3" ? tasks() :  currentPage;
        console.log("currentpage " + currentPage);
        var hash = location.hash.replace('#' ,'');
        console.log("tässä hash " + hash);
        
        
        //poistetaan luokkalistasta edellinen aktiivinen sivu. Näin style.css ymmärtää piilottaa edellisen sivun (kohdassa =>.page display: none;)
        document.querySelector('.active').classList.remove('active');
        console.log(document.getElementById(currentPage));

        //lisätään luokkalistaan tämän hetkinen sivu aktiiviseksi ja tässä style.css näyttää nykyisen aktiivisen sivun (kohdassa => .page display:block;)
        document.getElementById(currentPage).classList.add('active');
        console.log("luokkalista " + document.getElementById(currentPage).className);
        //Lisätään historiaan uusi sivu
        history.pushState({}, currentPage, `#${currentPage}`);
        //näytetään uusi valittu sivu
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
      
        console.log(ev.target);
        console.log('Page', ev.target.id, 'just shown');
        currentPage = ev.target.id ;
        console.log(currentPage);
       //Näytetään osion otsikko suurella fontilla hetkellisesti
        var h1 = ev.target.querySelector('h1');
        //Näytetään valitun elementin otsikko hetkellisesti suurena, tämäkin muotoilu löytyy style.css-tiedostosa
        h1.classList.add('big')
        setTimeout((h)=>{
            h.classList.remove('big');
        }, 1200, h1);
    },
    poppin: function(ev){
        
        console.log(location.hash, 'popstate event');
        //uusi hash
        var hash = location.hash.replace('#' ,'');
        
        //poistetaan luokkalistasta vanha aktiivinen osio/sivu
        document.querySelector('.active').classList.remove('active');
        
        //lisätään luokkalistaan uusi aktiivinen sivu
        document.getElementById(hash).classList.add('active');
        console.log(document.querySelector('.active').classList);
      
        
        console.log("tässä uusi hash" + hash)
       //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);
    }
}
function tasks(){
   //luo ja palauttaa uuden objektin valitun sivun perusteella
  
        objekti.height = screen.height;
        objekti.type = "text/html";
        //objekti.style.overflow = "hidden";
        objekti.id = "objekti";
        objekti.style.color = "red";
        objekti.data =currentPage === "jsperusteita" ? "jsperusteet.html" : currentPage === "perusteita" ? "jsjahtml.html": currentPage === "Tavoitteet" ? "tavoitteet.html": currentPage === "tehtava1" ? "visualcodeohje.html" : currentPage === "tehtava2" ? "gitohje.html" : currentPage === "tehtava3" ? "tehtava3.html" : "gitohje.txt";
       document.body.appendChild(objekti);

    return currentPage;
}
function goalTasks(){
    //luo ja palauttaa uuden objektin valitun sivun perusteella
   
         objekti.width = screen.width;
         objekti.height = screen.height;
         objekti.type = "text/html";
         //objekti.style.overflow = "hidden";
         objekti.id = "tavoiteobjekti";
         objekti.style.color = "red";
         objekti.data = "tavoitteet.html"
         document.body.appendChild(objekti);
        
     return currentPage;
 }

 //luo tehtävälistan instructions-osion alle
function showTasks(){
   console.log(document.getElementById("Tasks"));
    //tarkitetaan onko listaa jo luotu
    if (document.getElementById("tehtava1") == null) {
        var taskDiv = document.createElement("div");
        taskDiv.id = "Tasks";
         taskDiv.className = "page";

    document.body.appendChild(taskDiv);
    var task = "tehtava";
    
    var aTest = document.createElement("a");
    var today = new Date();
    aTest.href = "#";
   // var dd = String(today.getDate()).padStart(2, '0');
    //var listLength = parseInt(dd);
    // listLength = listLength < 3 ?  3 : listLength < 4 ?  5:  5;
       
    for (var i = 0; i < 3; i++) {
        
    var liTest = document.createElement("li");
    var aTest = document.createElement("a");
    aTest.href = "#";
   var aTestText = task + (i + 1);
   aTest.id = task+(i+1);
        aTest.innerText = aTestText;
        aTest.setAttribute("data-target", aTestText);
        var src = document.getElementById("instructions");
        liTest.appendChild(aTest);
        src.appendChild(liTest);
        document.getElementById(aTest.id).classList.add('nav-link');
        

    }
  
    app.init();
    console.log(app.pages);
 


}
}

//Lisätään kuuntelija, kun sisältö on ladattu, kutsutaan app.init-funktio
document.addEventListener('DOMContentLoaded', app.init);

