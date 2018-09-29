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

let oleg = new Crew('oleg', 'Oleg Germanovich', 'Pilot', 'Russia', 'Soviet Army, Spacecraft components manufacturing', '47', 'assets/images/crew/oleg.jpg');
let andrew = new Crew('andrew', 'Andrew J. Feustel', 'Commander', 'United States', 'Geophysicist', '53', 'assets/images/crew/andrew.jpg');
let richard = new Crew('richard', 'Richard "Ricky" Arnold II', 'Engineer', 'United States', 'High school biology teacher', '54', 'assets/images/crew/richard.jpg');
let sergey = new Crew('sergey', 'Sergey Prokopyev', 'Trainee', 'Russia', 'Pilot', '43', 'assets/images/crew/sergey.jpg');
let alexander = new Crew('alexander', 'Alexander Gerst', 'Engineer', 'Germany', 'Geophysicist', '42', 'assets/images/crew/alexander.jpg');
let serena = new Crew('serena', 'Serena M. Aunon-Chancellor', 'Medic', 'United States', 'Flight surgeon', '42', 'assets/images/crew/serena.jpg');

let crewArray = [oleg, andrew, richard, sergey, alexander, serena];