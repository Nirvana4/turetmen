// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var kok;
var ekSayisi;
//sesli harfler
var inceYuvarlakSesli = ['ö','ü'];
var kalinYuvarlakSesli = ['o','u'];
var inceDuzSesli = ['e','i'];
var kalinDuzSesli = ['a','ı'];

var sesliHarfler = ['a','e','ı','i','o','ö','u','ü'];
//sessiz harfler
var sertUnsuz =['p','ç','t','k','f','h','s','ş'];
var yumusakUnsuz =['b','c','d','g','l','m','n','r','v','y','z'];

var sertlestirenUnsuz=['p','ç','t','k'];
var sertlesenUnsuz = ['b','c','d','g'];
var sondaBulunmayanlar = ['b','c','g','h','d','ö'];

var sessizHarfler = ['b','c','d','f','g','h','k','l','m','n','p','r','s','ş','t','v','y','z'];

var yasaklar;

var turetilenler = new Array();
document.getElementById("ara").addEventListener("click", function (e) {
	kok = document.getElementById("kok").value;

	ekSayisi = document.getElementById("eksayisi").value;
	Temizle();
	turet(kok,document.getElementById("filtre").value);
}); 
document.getElementById("filtre").addEventListener("input", function (e) {
	console.log("input"+this.value);
	Temizle();
	turet(kok,this.value);
}); 
function Temizle(){
	turetilenler=new Array();
	document.getElementById("ek1").innerHTML="";
	document.getElementById("ek2").innerHTML="";
	document.getElementById("ek3").innerHTML="";
	document.getElementById("ek4").innerHTML="";

}
function turet(kelime,filtre){

	if(ekSayisi==1 || ekSayisi==2 || ekSayisi ==3 || ekSayisi==4){
		var arr = new Array();
		var sayi=0;
		TumOlasiEkAl(kelime,true).forEach(function(ek){
			if(ek.includes(filtre) || filtre==""){
				arr.push(kelime+ek);
				sayi++;
				document.getElementById("ek1-sayi").innerHTML=sayi+" adet";
				document.getElementById("ek1").innerHTML+="<div class='item sozcuk'>"+(kelime+ek)+"</div>";
			}

		});
		turetilenler.push(arr);
	}
	if(ekSayisi==2 || ekSayisi ==3 || ekSayisi==4){
		var arr = new Array();
		var sayi=0;
		TumOlasiEkAl(kelime,false).forEach(function(ek){
			TumOlasiEkAl(kelime+ek,true).forEach(function(ek2){
				if((ek+ek2).includes(filtre) || filtre==""){
					arr.push(kelime+ek+ek2);
					sayi++;
					document.getElementById("ek2-sayi").innerHTML=sayi+" adet";
					document.getElementById("ek2").innerHTML+="<div class='item sozcuk'>"+(kelime+ek+ek2)+"</div>";
				}

			});
		});

		turetilenler.push(arr);
	}
	if(ekSayisi==3 || ekSayisi==4){
		var arr = new Array();
		var sayi=0;
		TumOlasiEkAl(kelime,false).forEach(function(ek){
			TumOlasiEkAl(kelime+ek,false).forEach(function(ek2){
				TumOlasiEkAl(kelime+ek+ek2,true).forEach(function(ek3){
					if((ek+ek2+ek3).includes(filtre) || filtre==""){
						arr.push(kelime+ek+ek2+ek3);
						sayi++;
						document.getElementById("ek3-sayi").innerHTML=sayi+" adet";
						document.getElementById("ek3").innerHTML+="<div class='item sozcuk'>"+(kelime+ek+ek2+ek3)+"</div>";
					}
				});
			});
		});
		turetilenler.push(arr);

	}
	if (ekSayisi==4){
		var arr = new Array();
		var sayi=0;
		TumOlasiEkAl(kelime,false).forEach(function(ek){
			TumOlasiEkAl(kelime+ek,false).forEach(function(ek2){
				TumOlasiEkAl(kelime+ek+ek2,false).forEach(function(ek3){
					TumOlasiEkAl(kelime+ek+ek2+ek3,true).forEach(function (ek4){
						if((ek+ek2+ek3+ek4).includes(filtre) || filtre==""){
							arr.push(kelime+ek+ek2+ek3+ek4);
							sayi++;
							document.getElementById("ek4-sayi").innerHTML=sayi+" adet";
							document.getElementById("ek4").innerHTML+="<div class='item sozcuk'>"+(kelime+ek+ek2+ek3+ek4)+"</div>";
						}
					});
				});
			});
		});
		turetilenler.push(arr);
	}
/*
	for(var a=1;a<turetilenler.length-1;a++){
		console.log("ek"+a);
		document.getElementById("ek"+(a)).innerHTML+="<div class='ui list'>";
		for(var b=0;b<turetilenler[a].length;b++){
				console.log(turetilenler[a][b]);
				document.getElementById("ek"+(a)).innerHTML+="<div class='ui item'>"+turetilenler[a][b]+"</div>";
		}
		document.getElementById("ek"+(a)).innerHTML+="</div>";

	}*/
	console.log(turetilenler);
	var sozcukler = document.getElementsByClassName("sozcuk");
	for(var i=0;i<sozcukler.length;i++){
		sozcukler[i].addEventListener("click", function (e) {
			Temizle();
			turet(this.innerHTML,document.getElementById("filtre").value);
			kok = this.innerHTML;
			document.getElementById("kok").value=this.innerHTML;

		});
	}

		/*document.getElementById("tablo").innerHTML+="<tr>";
		document.getElementById("tablo").innerHTML+="<td><b>"+(a+1)+" heceli</b></td>";
		TumOlasiEkAl(kelime,son).forEach(function(ek){
				var yedekKelime;
			for (a=a; a < ekSayisi; a++) {
				yedekKelime = kelime+ek;
				document.getElementById("tablo").innerHTML+="<td>"+(yedekKelime)+"</td>";
			}
		});

	document.getElementById("tablo").innerHTML+="</tr>";*/

}

function EkEkle(kelime,a){
	TumOlasiEkAl(kelime,a<=ekSayisi-1).forEach(function(ek){
		if(!a<=ekSayisi-1){
			EkEkle(kelime+ek,a);
		}
	});
}

function KalinMi(karakter){
	return kalinYuvarlakSesli.concat(kalinDuzSesli).indexOf(karakter) > -1;
}
function InceMi(karakter){
	return inceYuvarlakSesli.concat(inceDuzSesli).indexOf(karakter) > -1;

}
//verilen karakterin sesli olup olmadığını söyler
function SesliMi(karakter){
	return sesliHarfler.indexOf(karakter) > -1;
}
function SessizMi(karakter){
	return sessizHarfler.indexOf(karakter) > -1;
}

function YuvarlakMi(karakter){
	return kalinYuvarlakSesli.concat(inceYuvarlakSesli).indexOf(karakter) > -1;
} 

function DuzMu(karakter){
	return kalinDuzSesli.concat(inceDuzSesli).indexOf(karakter) > -1;
}

function SertlestirenUnsuzMu(karakter){
	return sertlestirenUnsuz.indexOf(karakter) > -1;
}
function SertlesenUnsuzMu(karakter){
	return sertlesenUnsuz.indexOf(karakter) > -1;
}

function SonSesliAl(sozcuk){
	for(var a = sozcuk.length-1;a>0;a--){
		if(SesliMi(sozcuk[a])){
			return sozcuk[a];
			break;
		}
	}
}

function TumOlasiEkAl(sozcuk,son){
	var karakter;
	var dondur= new Array();
	//son karakter sessiz ise sesli döndürür ve eğer bir önceki de sesli ise sessiz ek döndürür. Ancak son harf sessiz olamaz!
	if(SessizMi(sozcuk[sozcuk.length-1])){
		//eğer son karakter sertleştiren ünsüz ise, b g d c kullanılmayacak
		if(SessizMi(sozcuk[sozcuk.length-2])){
			if(!son){
				if(SertlestirenUnsuzMu(sozcuk[sozcuk.length-1])){
					//sessiz harfler ekle
					dondur= dondur.concat(DiziCikar(sessizHarfler,sertlesenUnsuz));
				}
				else{
					dondur = sessizHarfler;
				}
			}
		}
			//sözcük kalın ise
			if(KalinMi(SonSesliAl(sozcuk))){
				//kalın yuvarlak ise---
				if(YuvarlakMi(SonSesliAl(sozcuk)))
				{
					dondur= dondur.concat(kalinYuvarlakSesli);
					dondur= dondur.concat(kalinDuzSesli);

				}
				else // kalın düz ise
				{
					dondur = dondur.concat(kalinDuzSesli);
				}
			}
			else // sözcük ince ise
			{
				if(YuvarlakMi(SonSesliAl(sozcuk)))
				{
					dondur= dondur.concat(inceYuvarlakSesli);
					dondur= dondur.concat(inceDuzSesli);

				}
				else // kalın düz ise
				{
					dondur = dondur.concat(inceDuzSesli);
				}
			}
			//eğer ek son ek harf ise sonda bulunmayanları çıkaralım
			if(son){
				dondur = DiziCikar(dondur,sondaBulunmayanlar);
			}
			return dondur;

	}else{	//eğer son karakter sesli ise sadece sessiz harf gelebilir
		dondur = sessizHarfler;
		//eğer ek son ek harf ise sonda bulunmayanları çıkaralım
		if (son){
			dondur = DiziCikar(dondur,sondaBulunmayanlar);
		}
		return dondur;
	}
}





//javascript çözümleri
function DiziCikar(dizi,cikarilacakDizi){
	var temp = {}, i, result = [];
    // load contents of filt into object keys for faster lookup
    for (i = 0; i < cikarilacakDizi.length; i++) {
        temp[cikarilacakDizi[i]] = true;
    }

    // go through src
    for (i = 0; i < dizi.length; i++) {
        if (!(dizi[i] in temp)) {
            result.push(dizi[i]);
        }
    }
    return(result);
}




/*
//sınıf sistemi
class Sozcuk {
  constructor(sozcuk) {
  	sesli(){
  		return sesliHarfler.indexOf(sozcuk) > -1;
  	}
  }
}*/