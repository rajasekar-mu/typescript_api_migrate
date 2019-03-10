"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express_1 = require("express");
const usersModel_1 = require("../model/usersModel");
const mongoose = require("mongoose");
const User = mongoose.model('users', usersModel_1.UserSchema);
class HeroRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.delete('/:id', this.deleteOne);
        this.router.post('/add', this.addNewUsers);
        this.router.get('/users', this.getUsers);
    }
    getUsers(req, res) {
        User.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    addNewUsers(req, res) {
        let newUser = new User(req.body);
        newUser.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getAll(req, res, next) {
        res.send(data);
    }
    getOne(req, res, next) {
        let query = parseInt(req.params.id);
        debug('get by id: ' + query);
        let hero = data.find(hero => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                hero
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No hero found with the given id.',
                status: res.status
            });
        }
    }
    deleteOne(req, res, next) {
        let query = parseInt(req.params.id);
        let hero = data.find(hero => hero.id === query);
        if (hero) {
            // Heroes.delete(hero.id);
            res.status(200)
                .send({
                message: 'ok',
                status: res.status
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No hero found with the given id.',
                status: res.status
            });
        }
    }
}
exports.HeroRouter = HeroRouter;
const heroRoutes = new HeroRouter();
//heroRoutes.init();
exports.default = heroRoutes.router;
var data = [
    {
        "id": 1,
        "name": "Luke Cage",
        "aliases": ["Carl Lucas", "Power Man", "Mr. Bulletproof", "Hero for Hire"],
        "occupation": "bartender",
        "gender": "male",
        "height": {
            "ft": 6,
            "in": 3
        },
        "hair": "bald",
        "eyes": "brown",
        "powers": [
            "strength",
            "durability",
            "healing"
        ]
    },
    {
        "id": 2,
        "name": "Spider-Man",
        "aliases": ["Dr. Peter Benjamin Parker", "Spidey", "Web-Sligner", "Spider-X-Man"],
        "occupation": "scientist",
        "gender": "male",
        "height": {
            "ft": 5,
            "in": 10
        },
        "hair": "brown",
        "eyes": "hazel",
        "powers": [
            "wall-crawling",
            "strength",
            "speed",
            "stamina",
            "durability",
            "agility",
            "healing",
            "reflexes",
            "Spider-Sense",
            "genius"
        ]
    },
    {
        "id": 3,
        "name": "Captain America",
        "aliases": [
            "Winghead",
            "Shield-Slinger",
            "the Captain",
            "Cap",
            "Yeoman America",
            "Sentinel of Liberty",
            "The Living Legend"
        ],
        "occupation": "special agent",
        "gender": "male",
        "height": {
            "ft": 6,
            "in": 2
        },
        "hair": "blonde",
        "eyes": "blue",
        "powers": [
            "strength",
            "speed",
            "durability",
            "agility",
            "reflexes",
            "stamina",
            "healing",
            "longevity"
        ]
    },
    {
        "id": 4,
        "name": "Iron Man",
        "aliases": [
            "Tony Stark",
            "Golden Gladiator",
            "Spare Parts Man",
            "Space-Knight"
        ],
        "occupation": "inventor",
        "gender": "male",
        "height": {
            "ft": 6,
            "in": 1
        },
        "hair": "black",
        "eyes": "blue",
        "powers": []
    },
    {
        "id": 5,
        "name": "Wolverine",
        "aliases": [
            "Logan",
            "Weapon X",
            "Death",
            "Agent Ten",
            "Fist of Legend"
        ],
        "occupation": "special agent",
        "gender": "male",
        "height": {
            "ft": 5,
            "in": 3
        },
        "hair": "black",
        "eyes": "blue",
        "powers": [
            "healing",
            "acute senses",
            "strength",
            "speed",
            "durability",
            "agility",
            "stamina",
            "weather adaptation",
            "animal empathy",
            "bone claws"
        ]
    }
];
//# sourceMappingURL=HeroRouter.js.map