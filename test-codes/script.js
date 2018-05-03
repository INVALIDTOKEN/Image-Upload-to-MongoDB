
const input = document.getElementsByTagName("input")[0];
const form = document.getElementsByTagName("form")[0];
const alertDiv = document.getElementsByClassName("alert")[0];
const previewDiv = document.getElementsByClassName("preview")[0];

const createPreview = function(mainDiv, element){
    const listItemDiv = document.createElement("div");
    listItemDiv.className = "list-group-item";

    const divInfo = document.createElement("div");
    const divImage = document.createElement("div");

    const strong = document.createElement("strong");
    strong.textContent = "Size  :  ";

    const para = document.createElement("p");
    para.className = "d-inline";
    para.textContent = `( ${element.size} )`;

    divInfo.appendChild(strong);
    divInfo.appendChild(para);

    const imageElement = document.createElement("img");
    imageElement.src = window.URL.createObjectURL(element);
    imageElement.className = "border border-primary";
    divImage.appendChild(imageElement);
    
    listItemDiv.appendChild(divInfo);
    listItemDiv.appendChild(divImage);

    mainDiv.appendChild(listItemDiv);
}

const validationFunction = function ({className = "alert alert-danger", msg = "Please Select atmost 4 and atleast 1 Image", formEvent = true }={}){
    if(formEvent){
        event.preventDefault();
    }

    alertDiv.style.display = "block";
    alertDiv.className = className;
    alertDiv.textContent = msg;

    setTimeout(function(){
        alertDiv.style.display = "none";
    }, 4000);
}

input.addEventListener("change", function(event){
    previewDiv.innerHTML = "No Image Selected Yet";
    let currentFiles = event.target.files;
    if(currentFiles.length > 4){
        return validationFunction({
            className : "alert alert-info",
            formEvent : false,
            msg : "The maximum limit is 4 images"
        });
    }

    previewDiv.innerHTML = "";

    // LIST-GROUP DIV
    let listGroupDiv = document.createElement("div");
    listGroupDiv.className = "list-group";
    previewDiv.appendChild(listGroupDiv);

    for(let element of currentFiles){
        createPreview(listGroupDiv, element);
    }

    const allImages = document.querySelectorAll(".preview .list-group img");
    allImages.forEach(function(image){
        image.addEventListener("click", function(event){
            let viewer = ImageViewer();
            viewer.show(event.target.src);
        });
    });

    validationFunction({className : "alert alert-info", msg : "If you have problem with any image please select all images again", formEvent : false });
});

form.addEventListener("submit", function(event){
    if( input.files.length == 0 || input.files.length > 4 ){
        return validationFunction({className : "alert alert-danger"});
    }
});








