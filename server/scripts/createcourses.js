function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


const courseNames = [
    'Golf Pirkkala, 18r',
    'Pickala Golf, Seaside',
    'Pickala Golf, Forest',
    'Nordcenter Golf, Fream',
    'Nordcenter Golf, Benz',
    'Nokia River Golf, River',
    'Nokia River Golf, Rock',
    'Peuramaa Golf, Iso-Peura',
    'St. Laurence Golf, Kalkki-Petteri',
]

holeTeesDTOList = Array(3).fill().map(() => ({
    teeId: uuidv4(),
    coordinates: '0.12323,0.65543533',
    length: getRandomInt(100, 560),
    teePar: getRandomInt(3, 5),
    teeColorID: 'yellow',
    color: 'yellow',
    teeColorDescription: "Men's tee",
    slopeMen: 12,
    slopeWomen: 12,
    ratingMen: 5,
    ratingWomen: 6
}))

holeDTOList = Array(18).fill().map((x, i) => ({
    holeId: uuidv4(),
    holeStatus: 'active',
    holeUpdateDate: '01-01-2020T00:00:00.000Z',
    holeNumber: i,
    strokeHCP: getRandomInt(3, 20),
    holePar: getRandomInt(3, 5),
    holeHCP: getRandomInt(3, 20),
    holeTeesDTOList
}))
  
const courses = Array(1).fill().map(() => ({
    courseId: uuidv4(),
    courseVersion: '1.0',
    courseStatus: 'active',
    courseType: 'emmuista',
    clubId: uuidv4(),
    coordinates: '0.12323,0.65543533',
    courseName: courseNames[getRandomInt(0, courseNames.length - 1)],
    holesCount: 18,
    holeDTOList
}))

console.log(JSON.stringify(courses))