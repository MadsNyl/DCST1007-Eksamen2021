// oppgave 1
class Kjoretoy {
    protected _makshastighet: number;
    protected _kjorelengde: number;
    protected _farge: string = "hvit";

    constructor(makshastighet: number, kjorelengde: number) {
        if (makshastighet > 0) this._makshastighet = makshastighet;
        else throw new Error("Makshastighet må være over 0.");

        if (kjorelengde >= 0) this._kjorelengde = kjorelengde;
        else throw new Error("Kjørelengde må være 0 eller større.");
    }

    get makshastighet(): number { return this._makshastighet; }
    get kjorelengde(): number { return this._kjorelengde; }
}

const mittKjoretoy = new Kjoretoy(100, 20);
console.log(mittKjoretoy.kjorelengde, mittKjoretoy.makshastighet);

class Buss extends Kjoretoy {

    private _makspassasjerer: number;

    constructor(makshastighet: number, kjorelengde: number, makspassasjerer: number) {
        super(makshastighet, kjorelengde);
        if (makspassasjerer > 0) this._makspassasjerer = makspassasjerer;
        else throw new Error("Det må være mulig med minst 1 passasjer.");
    }

    get makspassasjerer(): number { return this._makspassasjerer; }

    sjekkAntall(antallpassasjerer: number): boolean { return antallpassasjerer > this._makspassasjerer; }

    leiePris(): number { return (this._makspassasjerer * 100) * 1.25; }
}

const minBuss = new Buss(100, 20, 50);
const erIkkePlass = minBuss.sjekkAntall(50);

erIkkePlass
    ? console.log("Det er ikke plass til 50 passasjerer i denne bussen.")
    : console.log("Det er plass til minst 50 passasjerer i denne bussen.");

console.log(minBuss.leiePris());


// oppgave 2

// a) Forklar begrepene objekt, klasse og instans.
// - objekt: en datatype for å lagre verdier som nøkler og nøkkelverdier.
// - klasse: en måte å strukturere variabler og metoder. Blir som en blueprint.
// - instans: når man oppretter en instans av en klasse, får man en instans
// som da vil ha tilgang på variabler og metoder som er en del av klassen.

// b) Hva gjør funksjonen super() når den blir kalt i en konstruktør?
// - Hvis en klasse arver fra en annen klasse, vil super() i en konstruktør gjøre
// at man den nye klassen får argumentene og variablene fra klassen den arver fra.

// d) Det kan være lurt å legge kode som hører til databaseoppkoblingen i en egen klasse. Hvorfor er det slik?
// - Fordi man skal bruke metoder fra tilkoblingen mange ganger. Så istedenfor å lage en kobling hver gang,
// kan man da benytte en instans for å bruke metodene om igjen.

// e) Hvis du skulle lagre påloggingsinformasjonen til databasen i programmet ditt, hvordan ville du gjort dette?
// i en .env fil slik at de ikke blir tilgjengelig for andre hvis man deler koden.
