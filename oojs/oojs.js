// 1. Egyszerű osztály és metódus
class Auto {
    constructor(marka, evjarat) {
        this.marka = marka;
        this.evjarat = evjarat;
    }

    info() {
        return `Ez egy ${this.evjarat}-es ${this.marka}.`;
    }
}

// 2. Öröklődés
class Sportauto extends Auto {
    constructor(marka, evjarat, gyorsulas) {
        super(marka, evjarat);
        this.gyorsulas = gyorsulas;
    }

    info() {
        return `${super.info()} Gyorsulás (0-100): ${this.gyorsulas} másodperc.`;
    }
}

// 3. Getter/Setter
class Ember {
    constructor(nev) {
        this._nev = nev;
    }

    get nev() {
        return this._nev;
    }

    set nev(ujNev) {
        if (ujNev.length > 0) {
            this._nev = ujNev;
        }
    }
}

// 4. Statikus metódus
class Matek {
    static osszeg(a, b) {
        return a + b;
    }
}

// 5. DOM interakció OOJS módon
class GombLetrehozo {
    constructor(gombSzoveg) {
        this.gombSzoveg = gombSzoveg;
    }

    hozzaadGombot(celElem) {
        const gomb = document.createElement('button');
        gomb.textContent = this.gombSzoveg;
        gomb.addEventListener('click', () => {
            alert(`A gomb (${this.gombSzoveg}) meg lett nyomva!`);
        });
        celElem.appendChild(gomb);
    }
}

// DOM-ba írás
const mainSect = document.querySelector('.mainSect');

function hozzaadCim(szoveg) {
    const h3 = document.createElement('h3');
    h3.textContent = szoveg;
    mainSect.appendChild(h3);
}

function hozzaadBekezdes(szoveg) {
    const p = document.createElement('p');
    p.textContent = szoveg;
    mainSect.appendChild(p);
}

hozzaadCim("1. Egyszerű osztály:");
const auto = new Auto("Toyota", 2020);
hozzaadBekezdes(auto.info());

hozzaadCim("2. Öröklődés:");
const sportauto = new Sportauto("Porsche", 2022, 3.2);
hozzaadBekezdes(sportauto.info());

hozzaadCim("3. Getter / Setter:");
const ember = new Ember("Kata");
hozzaadBekezdes(`Név: ${ember.nev}`);
ember.nev = "Dóra";
hozzaadBekezdes(`Új név: ${ember.nev}`);

hozzaadCim("4. Statikus metódus:");
const osszeg = Matek.osszeg(5, 7);
hozzaadBekezdes(`5 + 7 = ${osszeg}`);

hozzaadCim("5. OOJS DOM interakció:");
const gombKeszito = new GombLetrehozo("Kattints rám!");
gombKeszito.hozzaadGombot(mainSect);