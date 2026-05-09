let name ;

document.getElementById("sub"). onclick = function (){
    name = document.getElementById("name").value;
    document.getElementById("h1").textContent =  `hello ${name}`
}

// let prevBtn = document.getElementById("pre-btn");
// let nextBtn = document.getElementById("next-btn");
 
function openModal(){
    document.getElementById("pre-btn").style.display = "flex";
}

function closeModal(){
    document.getElementById("pre-btn").style.display = "none";
}

function openModal(){
    document.getElementById("next-btn").style.display = "flex";
}

function closeModal(){
    document.getElementById("next-btn").style.display = "none";
}



window.onclick = function(e){
    let modal = document.getElementById("pre-btn");
    if(e.target === modal){
        modal.style.display = "none";
    }
 }

 window.onclick = function(e){
    let modal = document.getElementById("next-btn");
    if(e.target === modal){
        modal.style.display = "none";
    }
 }