class Crew {
    constructor(key, name, title, country, otherOccupation, age, imgSrc) {
        this.key = key,
            this.name = name,
            this.title = title,
            this.country = country,
            this.otherOccupation = otherOccupation,
            this.age = age,
            this.imgSrc = imgSrc
    }
}

let oleg = new Crew('oleg', 'Oleg Germanovich', 'Pilot', 'Russia', 'n/a', 'age', 'assets/images/crew/oleg.jpg');
let andrew = new Crew('andrew', 'Andrew J. Feustel', 'Commander', 'United States', 'n/a', 'age', 'https://en.wikipedia.org/wiki/Andrew_J._Feustel#/media/File:Andrewfeustelv2.jpg');
let richard = new Crew('richard', 'Richard Arnold II', 'Engineer', 'United States', 'n/a', 'age', 'https://en.wikipedia.org/wiki/Richard_R._Arnold#/media/File:Richardarnoldv2.jpg');
let sergey = new Crew('sergey', 'Sergey Prokopyev', 'Trainee', 'Russia', 'n/a', 'age', 'https://en.wikipedia.org/wiki/Sergey_Prokopyev_(cosmonaut)#/media/File:Sergey_Prokopyev_-_NASA_portrait.jpg');
let alexander = new Crew('alexander', 'Alexander Gerst', 'Engineer', 'Germany', 'n/a', 'age', 'https://en.wikipedia.org/wiki/Alexander_Gerst#/media/File:Alexander_Gerst,_official_portrait_in_2017.jpg');
let serena = new Crew('serena', 'Serena M. Aunon-Chancellor', 'Medic', 'United States', 'n/a', 'age', 'https://en.wikipedia.org/wiki/Serena_Au%C3%B1%C3%B3n-Chancellor#/media/File:Serena_M._Aunon,_NASA_astronaut_candidate.jpg');

let crewArray = [oleg, andrew, richard, sergey, alexander, serena];