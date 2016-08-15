(function () {

    function getMenuData(){
        //json load from js/menu-data.js
        var menuData = menu.menu;
        return menuData;
    }

    function initMenu(){
        var mainMenuElem = document.getElementById("menu");
        generateMenu(getMenuData(), mainMenuElem);//generate memu+
        var heightWindow = document.body.clientHeight;
        var heightMenuWindow = heightWindow - 35*2;
        var heightItem = mainMenuElem.childNodes[0].clientHeight;
        mainMenuElem.setAttribute("firt-visible-menu-element", "0");
        adaptMenu(heightMenuWindow,heightItem,mainMenuElem);
        //event for window resize
        window.addEventListener("resize", function(){
            var heightWindow = document.body.clientHeight;
            var heightMenuWindow = heightWindow - 35*2;
            adaptMenu(heightMenuWindow,heightItem , mainMenuElem);
        });

        //event button top
        var buttonTop = document.getElementById("btnTop");
        buttonTop.addEventListener("click", function(ev){
            var firtVisibleMenuElement = +(mainMenuElem.getAttribute("firt-visible-menu-element"));
            var newFirtVisibleMenuElement = firtVisibleMenuElement-1;
            if(newFirtVisibleMenuElement < 0){
                newFirtVisibleMenuElement = 0;
            }
            mainMenuElem.setAttribute("firt-visible-menu-element", newFirtVisibleMenuElement);
            var heightWindow = document.body.clientHeight;
            var heightMenuWindow = heightWindow - 35*2;
            adaptMenu(heightMenuWindow,heightItem, mainMenuElem);
        }, false);

        //event button bottom
        var buttonBottom = document.getElementById("btnBottom");
        buttonBottom.addEventListener("click", function(ev){
            var firtVisibleMenuElement = +(mainMenuElem.getAttribute("firt-visible-menu-element"));
            var newFirtVisibleMenuElement = firtVisibleMenuElement+1;
            if(newFirtVisibleMenuElement > mainMenuElem.childNodes.length){newFirtVisibleMenuElement = mainMenuElem.childNodes.length}
            mainMenuElem.setAttribute("firt-visible-menu-element", newFirtVisibleMenuElement);
            var heightWindow = document.body.clientHeight;
            var heightMenuWindow = heightWindow - 35*2;
            adaptMenu(heightMenuWindow,heightItem,mainMenuElem);
        }, false);

    }



    function adaptMenu(height,heightItem ,mainMenuElem){
        var countMenuItem = mainMenuElem.childNodes.length;
        var heightMenuItem = heightItem ;
        var buttonTop = document.getElementById("btnTop");
        var buttonBottom = document.getElementById("btnBottom");
        var visibleCountMenuItem = Math.floor(height/heightMenuItem);
        var firtVisibleMenuElement = +(mainMenuElem.getAttribute("firt-visible-menu-element"));
        if(firtVisibleMenuElement > (countMenuItem - visibleCountMenuItem)){
            mainMenuElem.setAttribute("firt-visible-menu-element", (countMenuItem - visibleCountMenuItem));
            firtVisibleMenuElement = (countMenuItem - visibleCountMenuItem);
        }

        //menu height largest window?
        if(height < countMenuItem * heightMenuItem){
            //visible new visible element
            for (var i = firtVisibleMenuElement; i < visibleCountMenuItem+firtVisibleMenuElement; i++){
                mainMenuElem.childNodes[i].removeAttribute("class", "hidden");
            }
            //hide  element before visible element
            for (var i = 0; i < firtVisibleMenuElement; i++){
                mainMenuElem.childNodes[i].setAttribute("class", "hidden");
            }
            //hide  element after visible element
            for (var i = firtVisibleMenuElement + visibleCountMenuItem; i < countMenuItem; i++){
                mainMenuElem.childNodes[i].setAttribute("class", "hidden");
            }
            //show nav button
            buttonTop.setAttribute("class", "menu__button");
            buttonBottom.setAttribute("class", "menu__button");
        }else{
            //hide nav button
            buttonTop.removeAttribute("class","menu__button");
            buttonBottom.removeAttribute("class","menu__button");
            buttonTop.setAttribute("class", "hidden");
            buttonBottom.setAttribute("class", "hidden");
        }
    }

    function generateMenu(data, el) {
        for (var i = 0; i < data.length; i++) {

            //create li
            var menuElement = document.createElement("li");
            el.appendChild(menuElement);

            //create a
            var menuLink = document.createElement("a");
            menuLink.setAttribute("href", data[i].url);
            menuLink.setAttribute("title", data[i].title);
            menuLink.innerHTML = data[i].title;

            //if menu element has submenu
            if (typeof data[i].submenu != 'undefined') {
                //create arrow
                var arrow = document.createElement("div");
                var arrowContent = document.createElement("span");
                arrowContent.className = 'arrow';
                arrowContent.innerHTML = '►';
                arrow.className = 'arrow-wrap';
                arrow.appendChild(arrowContent);

                menuLink.appendChild(arrow);
                menuElement.appendChild(menuLink);

                var subMenu = document.createElement("ul");
                subMenu.className = 'subMenu';
                var properties = {
                    submenu : data[i].submenu, 
                    subMenuEl : subMenu, 
                    menuEl : menuElement
                };

                openSubMenu(menuLink,properties);
            } else {
                menuElement.appendChild(menuLink);
            }
        }
    }

    function openSubMenu( el , properties ) {
        el.addEventListener("click", function(ev){
            ev.stopPropagation();
            var subMenus = ev.target.parentNode.parentNode.parentNode.getElementsByTagName("ul");

            for (var i = 1; i < subMenus.length; i++) {
                subMenus[i].parentNode.removeChild(subMenus[i]);
            }
            properties.subMenuEl.innerHTML = "";
            properties.menuEl.appendChild(properties.subMenuEl);
            generateMenu(properties.submenu,properties.subMenuEl);
        
        }, false);
        
    }
    return initMenu();
    
})();




