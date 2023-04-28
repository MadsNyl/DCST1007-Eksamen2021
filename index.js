var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Kjoretoy = /** @class */ (function () {
    function Kjoretoy(makshastighet, kjorelengde) {
        this._farge = "hvit";
        if (makshastighet > 0)
            this._makshastighet = makshastighet;
        else
            throw new Error("Makshastighet må være over 0.");
        if (kjorelengde >= 0)
            this._kjorelengde = kjorelengde;
        else
            throw new Error("Kjørelengde må være 0 eller større.");
    }
    Object.defineProperty(Kjoretoy.prototype, "makshastighet", {
        get: function () { return this._makshastighet; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Kjoretoy.prototype, "kjorelengde", {
        get: function () { return this._kjorelengde; },
        enumerable: false,
        configurable: true
    });
    return Kjoretoy;
}());
var mittKjoretoy = new Kjoretoy(100, 20);
console.log(mittKjoretoy.kjorelengde, mittKjoretoy.makshastighet);
var Buss = /** @class */ (function (_super) {
    __extends(Buss, _super);
    function Buss(makshastighet, kjorelengde, makspassasjerer) {
        var _this = _super.call(this, makshastighet, kjorelengde) || this;
        if (makspassasjerer > 0)
            _this._makspassasjerer = makspassasjerer;
        else
            throw new Error("Det må være mulig med minst 1 passasjer.");
        return _this;
    }
    Object.defineProperty(Buss.prototype, "makspassasjerer", {
        get: function () { return this._makspassasjerer; },
        enumerable: false,
        configurable: true
    });
    Buss.prototype.sjekkAntall = function (antallpassasjerer) { return antallpassasjerer > this._makspassasjerer; };
    Buss.prototype.leiePris = function () { return (this._makspassasjerer * 100) * 1.25; };
    return Buss;
}(Kjoretoy));
var minBuss = new Buss(100, 20, 50);
var erIkkePlass = minBuss.sjekkAntall(50);
erIkkePlass
    ? console.log("Det er ikke plass til 50 passasjerer i denne bussen.")
    : console.log("Det er plass til minst 50 passasjerer i denne bussen.");
console.log(minBuss.leiePris());
