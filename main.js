"use strict"

// import ngram from "./ngram"
import nGram from "./ngram.js"

// const text = "De hond rent in de tuin. In de tuin staat een boom."
// const text = "De hond rent in de tuin."

const text = "Er was eens een hond genaamd Max. Hij was een grote, pluizige hond met een gouden vacht en trouwe, bruine ogen. Max woonde in een prachtig huis met zijn baasje, Anna. Anna hield van Max en hij hield van haar, maar hij was vooral dol op de grote tuin achter het huis.\n" +
    "\n" +
    "Max hield ervan om te rennen en te spelen in de tuin. Hij had zijn eigen kleine speeltuin, gevuld met ballen, frisbees en andere speeltjes. Maar er was één plek in de tuin waar Max het allerliefst kwam: de grote, oude boom aan de rand van de tuin.\n" +
    "\n" +
    "De boom was enorm en had een dikke stam en takken die zich ver uitstrekten. Max vond het heerlijk om onder de boom te liggen en te genieten van de koele schaduw die hij bood op warme dagen. Maar het was niet alleen de schaduw die Max aantrok. Er was iets speciaals aan deze boom dat hem intrigeerde.\n" +
    "\n" +
    "Op een dag, terwijl Max onder de boom lag, keek hij omhoog en zag hij iets vreemds. Er zat een kleine opening in de boomstam, net groot genoeg voor een hond om doorheen te kruipen. Max was nieuwsgierig en besloot om te onderzoeken wat er aan de hand was. Hij sprong op en liep naar de opening. Toen hij erdoorheen kroop, vond hij zichzelf in een kleine, verborgen tuin aan de andere kant van de boom.\n" +
    "\n" +
    "De tuin was klein, maar prachtig. Er waren allerlei soorten bloemen en planten, en er was een kleine vijver met helder water. Max was blij verrast en besloot om dit zijn eigen geheime plekje te maken. Hij bracht zijn speeltjes en een deken mee en maakte het gezellig onder de boom.\n" +
    "\n" +
    "Anna merkte dat Max veel tijd doorbracht onder de boom en vroeg zich af waarom. Ze volgde hem op een dag en ontdekte de verborgen tuin. Ze was net zo verrast als Max en was blij dat hij een speciale plek had gevonden waar hij van kon genieten.\n" +
    "\n" +
    "Vanaf die dag begon Anna de verborgen tuin onder de boom te verzorgen. Ze plantte nieuwe bloemen en maakte het pad schoon. Max en Anna brachten veel tijd samen door in de geheime tuin en ze genoten er allebei van.\n" +
    "\n" +
    "De boom bleef groeien en bloeien en Max bleef zijn geheime plekje koesteren. Hij wist dat hij altijd een speciale band zou hebben met deze boom en de verborgen tuin. Zelfs als hij oud was en niet meer zo speels, zou hij nog steeds genieten van de koele schaduw en de rustige sfeer die hij hier vond.\n" +
    "\n" +
    "En zo bleef Max zijn dagen doorbrengen onder de oude boom, gelukkig en tevreden in zijn eigen kleine paradijs in de tuin."

const ngram = new nGram(text, 4)
console.log(ngram.createText(4))