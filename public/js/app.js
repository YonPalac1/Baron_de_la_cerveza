/***************Menus Desplegables ***********************/
function showMenu(){
	let menu = document.getElementById('menu');
		menu.classList.toggle('active');
}

function showSubmenu(){
		let subNave = document.getElementById('subNave');
		subNave.classList.toggle('active');
	}
function showCart(){
	let carritoMenu = document.getElementById('carrito-menu');
	carritoMenu.classList.toggle('active');	
}
function showCategories(){
    let categoriesCollapse = document.getElementById('categoriesCollapse');
    categoriesCollapse.classList.toggle('active'); 
}

function showSearch(){
    let showSearch = document.getElementById('showSearch');
    showSearch.classList.toggle('active'); 	
}

/*************** /Menus Desplegables ***********************/
