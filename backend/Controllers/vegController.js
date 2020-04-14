const fs = require('fs');

const Validator = require('../modules/validator');

class vegController {
    // static settings(req, res) {
    //     res.json({ result: true, return: { ...req.user.settings, SetData: { ...req.user.settings.SetData, userId: req.user._id } } });
    // }

    static addVeg(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(req);
                Validator.string(req.body.label);
                Validator.string(req.body.description);
                Validator.string(req.body.price);
                Validator.string(req.body.category);
                Validator.boolean(req.body.isSale);
                Validator.boolean(req.body.image);

                const {label, description, price, isSale, category, imageType, image} = req.body;

                const dir = `../storage`;

                if(!fs.existsSync(dir))
                    fs.mkdirSync(dir);

                const newFileName = `${Date.now()}.${imageType}`;

                fs.writeFile(`../storage/${newFileName}`, image.split(';base64,').pop(), 'base64', (err) => { console.log(err); });

                const fileLink = `http://192.236.146.174:8000/storage/${newFileName}`;

                const salePrice = req.body.salePrice || null;

                const addedData = {
                    label,
                    description,
                    price,
                    category,
                    isSale,
                    salePrice,
                    image: fileLink,
                    time: Date.now(),
                };

                const insertedData = await mongodb.insertOne('vegs', addedData);

                return resolve(res.json({
                    result: true,
                    title: 'Добавление товаров',
                    message: 'Успешно.',
                    time: Date.now(),
                    _id: insertedData.insertedId,
                }));
            } catch(err) {
                console.log(err);
                return reject(res.json({
                    result: false,
                    title: 'Добавление товаров',
                    message: 'Серверная ошибка.',
                    time: Date.now(),
                }));
            }
        });
    }

    static addDesc(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(req);
                Validator.string(req.body.label);
                Validator.string(req.body.description);
                Validator.boolean(req.body.image);

                const {label, description, imageType, image} = req.body;

                const dir = `../storage`;

                if(!fs.existsSync(dir))
                    fs.mkdirSync(dir);

                const newFileName = `${Date.now()}.${imageType}`;

                fs.writeFile(`../storage/${newFileName}`, image.split(';base64,').pop(), 'base64', (err) => { console.log(err); });

                const fileLink = `http://192.236.146.174:8000/storage/${newFileName}`;

                const salePrice = req.body.salePrice || null;

                const addedData = {
                    label,
                    description,
                    salePrice,
                    image: fileLink,
                    time: Date.now(),
                };

                const insertedData = await mongodb.insertOne('desc', addedData);

                return resolve(res.json({
                    result: true,
                    title: 'Добавление преимуществ',
                    message: 'Успешно.',
                    time: Date.now(),
                    _id: insertedData.insertedId,
                }));
            } catch(err) {
                console.log(err);
                return reject(res.json({
                    result: false,
                    title: 'Добавление товаров',
                    message: 'Серверная ошибка.',
                    time: Date.now(),
                }));
            }
        });
    }

    static storage(req, res) {
        const path = req.url.slice(1);
        fs.readFile('../'+path, (err, image) => { console.log(err); return res.end(image) });
    }

    static getVegs(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await mongodb.getAll('vegs');

                return resolve(res.json({
                    result: true,
                    title: 'Получение товаров',
                    message: 'Успешно.',
                    time: Date.now(),
                    return: data.reverse()
                }));
            } catch(err) {
                console.log(err);
                return reject(res.json({
                    result: false,
                    title: 'Получение товаров',
                    message: 'Серверная ошибка.',
                    time: Date.now(),
                }));
            }
        });
    };

    
    static getDesc(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await mongodb.getAll('desc');

                return resolve(res.json({
                    result: true,
                    title: 'Получение товаров',
                    message: 'Успешно.',
                    time: Date.now(),
                    return: data.reverse()
                }));
            } catch(err) {
                console.log(err);
                return reject(res.json({
                    result: false,
                    title: 'Получение товаров',
                    message: 'Серверная ошибка.',
                    time: Date.now(),
                }));
            }
        });
    };

    static delVegs(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(req.params);
                Validator.string(req.params.id);

                const _id = req.params.id;

                const data = await mongodb.deleteOne('vegs', { _id: mongodb.id(_id) });

                return resolve(res.json({
                    result: true,
                    title: 'Получение товаров',
                    message: 'Успешно.',
                    time: Date.now(),
                }));
            } catch(err) {
                console.log(err);
                return reject(res.json({
                    result: false,
                    title: 'Получение товаров',
                    message: 'Серверная ошибка.',
                    time: Date.now(),
                }));
            }
        });
    };

    static delDesc(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(req.params);
                Validator.string(req.params.id);

                const _id = req.params.id;

                const data = await mongodb.deleteOne('desc', { _id: mongodb.id(_id) });

                return resolve(res.json({
                    result: true,
                    title: 'Получение товаров',
                    message: 'Успешно.',
                    time: Date.now(),
                }));
            } catch(err) {
                console.log(err);
                return reject(res.json({
                    result: false,
                    title: 'Получение товаров',
                    message: 'Серверная ошибка.',
                    time: Date.now(),
                }));
            }
        });
    };

    static putVegs(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(req.body);

                Validator.string(req.body.label);
                Validator.string(req.body.description);
                Validator.string(req.body.price);
                Validator.string(req.body.category);
                Validator.boolean(req.body.isSale);
                Validator.boolean(req.body.image);
                Validator.string(req.body._id);

                let { label, description, price, isSale, category, imageType, image, _id } = req.body;

                if (image[0] !== 'h') {
                    const findVeg = await mongodb.aggregate('vegs', [
                        { $match: { _id: mongodb.id(_id) } },
                    ]);

                    if (!findVeg.length)
                        return resolve(res.json({
                            result: false,
                            title: 'Обновление товаров',
                            message: 'Товар не найден.',
                            time: Date.now(),
                        }));

                    const dir = `../storage`;

                    fs.unlinkSync('../'+findVeg[0].image.slice(28));

                    if(!fs.existsSync(dir))
                        fs.mkdirSync(dir);

                    const newFileName = `${Date.now()}.${imageType}`;

                    fs.writeFileSync(`../storage/${newFileName}`, image.split(';base64,').pop(), 'base64');

                    image = `http://192.236.146.174:8000/storage/${newFileName}`;
                }

                const salePrice = req.body.salePrice || null;

                const addedData = {
                    label,
                    description,
                    price,
                    category,
                    isSale,
                    salePrice,
                    image,
                    time: Date.now(),
                };

                console.log(addedData);

                await mongodb.updateOne('vegs', { _id: mongodb.id(_id) }, { $set: addedData });

                return resolve(res.json({
                    result: true,
                    title: 'Обновление товаров',
                    message: 'Успешно.',
                    time: Date.now(),
                }));
            } catch(err) {
                console.log(err);
                return reject(res.json({
                    result: false,
                    title: 'Обновление товаров',
                    message: 'Серверная ошибка.',
                    time: Date.now(),
                }));
            }
        });
    }


    static putDesc(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                Validator.string(req.body.label);
                Validator.string(req.body.description);
                Validator.boolean(req.body.image);
                Validator.string(req.body._id);

                let { label, description, imageType, image, _id } = req.body;

                if (image[0] !== 'h') {
                    const findVeg = await mongodb.aggregate('desc', [
                        { $match: { _id: mongodb.id(_id) } },
                    ]);

                    if (!findVeg.length)
                        return resolve(res.json({
                            result: false,
                            title: 'Обновление товаров',
                            message: 'Товар не найден.',
                            time: Date.now(),
                        }));

                    const dir = `../storage`;

                    fs.unlinkSync('../'+findVeg[0].image.slice(28));

                    if(!fs.existsSync(dir))
                        fs.mkdirSync(dir);

                    const newFileName = `${Date.now()}.${imageType}`;

                    fs.writeFileSync(`../storage/${newFileName}`, image.split(';base64,').pop(), 'base64');

                    image = `http://192.236.146.174:8000/storage/${newFileName}`;
                }

                const addedData = {
                    label,
                    description,
                    image,
                    time: Date.now(),
                };

                console.log(addedData);

                await mongodb.updateOne('desc', { _id: mongodb.id(_id) }, { $set: addedData });

                return resolve(res.json({
                    result: true,
                    title: 'Обновление товаров',
                    message: 'Успешно.',
                    time: Date.now(),
                }));
            } catch(err) {
                console.log(err);
                return reject(res.json({
                    result: false,
                    title: 'Обновление товаров',
                    message: 'Серверная ошибка.',
                    time: Date.now(),
                }));
            }
        });
    }


    // static saveFile(req, res) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const findUser = await mongodb.aggregate('users', [
    //                 { $match: { _id: req.user._id } },
    //             ]);

    //             if(!findUser.length) {
    //                 return reject(res.json({
    //                     result: false,
    //                     title: 'Загрузка справок об образовании',
    //                     message: 'Произошла ошибка поиска пользователя.',
    //                 }));
    //             }

    //             const dirName = req.params.id;

    //             const dir = `storage/${dirName}/${req.user._id}`;

    //             if(!fs.existsSync(dir))
    //                 fs.mkdirSync(dir);

    //             const newFileType = req.body.FileInfo.Type.split('/')[1];
    //             const newFileName = `${Date.now()}.${newFileType}`;

    //             fs.writeFile(`storage/${dirName}/${req.user._id}/${newFileName}`, req.body.FileData, 'binary', (err) => { console.log(err); });

    //             let getSettings = findUser[0].settings;
    //             let eduDocks = [];
    //             const fileLink = `/user/storage/${dirName}/${req.user._id}/${newFileName}`;

    //             if(getSettings.files[dirName])
    //                 eduDocks = getSettings.files[dirName];

    //             eduDocks.push(fileLink);

    //             getSettings = { ...getSettings, files: { ...getSettings.files, [dirName]: eduDocks } };

    //             mongodb.updateOne('users', { _id: req.user._id }, { $set: { settings: getSettings } });

    //             return resolve(res.json({
    //                 result: true,
    //                 title: 'Загрузка справок об образовании',
    //                 message: 'Файл принят успешно.',
    //                 return: fileLink,
    //                 time: Date.now(),
    //             }));
    //         } catch(err) {
    //             reject(err);
    //         }
    //     });
    // }

    // static saveAva(req, res) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const findUser = await mongodb.aggregate('users', [
    //                 { $match: { _id: req.user._id } },
    //             ]);

    //             if(!findUser.length) {
    //                 return reject(res.json({
    //                     result: false,
    //                     title: 'Загрузка аватара',
    //                     message: 'Произошла ошибка поиска пользователя.',
    //                 }));
    //             }

    //             const dir = `storage/userAvatar/${req.user._id}`;

    //             if(!fs.existsSync(dir))
    //                 fs.mkdirSync(dir);

    //             let newFileType = '';

    //             newFileType = await req.body.FileInfo.Type.split('/')[1];

    //             const newFileNameBig = `${Date.now()}.${newFileType}`;
    //             const newFileNameMini = `${Date.now() + 1}.png`;

    //             let getSettings = findUser[0].settings;


    //             if(getSettings.files.userAvatar[0] !== '/user/storage/globalStorage/avatar/471a1ad342659289433e05a611d206f8.png') {
    //                 fs.unlinkSync(getSettings.files.userAvatar[0].slice(6));
    //                 fs.unlinkSync(getSettings.files.userAvatar[1].slice(6));
    //             }


    //             fs.writeFile(`storage/userAvatar/${req.user._id}/${newFileNameBig}`, req.body.FileData.split(';base64,').pop(), 'base64', (err) => { console.log(err); });
    //             fs.writeFile(`storage/userAvatar/${req.user._id}/${newFileNameMini}`, req.body.SmallAva.split(';base64,').pop(), 'base64', (err) => { console.log(err); });


    //             const userAvatar = [];
    //             const fileLinkBig = `/user/storage/userAvatar/${req.user._id}/${newFileNameBig}`;
    //             const fileLinkMini = `/user/storage/userAvatar/${req.user._id}/${newFileNameMini}`;

    //             userAvatar.push(fileLinkBig, fileLinkMini);

    //             getSettings = { ...getSettings, files: { ...getSettings.files, userAvatar } };

    //             mongodb.updateOne('users', { _id: req.user._id }, { $set: { settings: getSettings } });

    //             return resolve(res.json({
    //                 result: true,
    //                 title: 'Загрузка справок об образовании',
    //                 message: 'Файл принят успешно.',
    //                 return: userAvatar,
    //                 time: Date.now(),
    //             }));
    //         } catch(err) {
    //             return reject(res.json({
    //                 result: false,
    //                 title: 'Загрузка аватара',
    //                 message: 'Ошибка.',
    //                 time: Date.now(),
    //             }));
    //         }
    //     });
    // }

    // static changePassword(req, res) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             console.log(req.body);

    //             Validator.string(req.body.oldPass);
    //             Validator.string(req.body.newPass);

    //             const findUser = await mongodb.aggregate('users', [
    //                 { $match: { _id: req.user._id } },
    //             ]);

    //             if(!findUser.length) {
    //                 return resolve(res.json({
    //                     result: false,
    //                     title: 'Смена пароля',
    //                     message: 'Произошла ошибка поиска пользователя.',
    //                 }));
    //             }

    //             if(!bcrypt.compareSync(req.body.oldPass, findUser[0].password))
    //                 return resolve(res.json({
    //                     result: false,
    //                     title: 'Смена пароля',
    //                     message: 'Пароли не совпадают',
    //                 }));

    //             const salt = bcrypt.genSaltSync(10);
    //             const passwordToSave = bcrypt.hashSync(req.body.newPass, salt);

    //             mongodb.updateOne('users', { _id: req.user._id }, { $set: { password: passwordToSave } });

    //             return resolve(res.json({
    //                 result: true,
    //                 title: 'Смена пароля',
    //                 message: 'Успешно.',
    //                 time: Date.now(),
    //             }));
    //         } catch(err) {
    //             reject(err);
    //         }
    //     });
    // }

    // static deleteFile(req, res) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const findUser = await mongodb.aggregate('users', [
    //                 { $match: { _id: req.user._id } },
    //             ]);

    //             if(!findUser.length) {
    //                 return resolve(res.json({
    //                     result: false,
    //                     title: 'Загрузка справок об образовании',
    //                     message: 'Произошла ошибка поиска пользователя.',
    //                 }));
    //             }

    //             const path = req.params.id;

    //             const getSettings = findUser[0].settings;

    //             let getFiles = '';

    //             getFiles = findUser[0].settings.files[path];

    //             const toDel = getFiles.splice(req.body.index, 1);

    //             getSettings.files[path] = getFiles;

    //             fs.unlinkSync(toDel[0].slice(6));

    //             mongodb.updateOne('users', { _id: req.user._id }, { $set: { settings: getSettings } });

    //             return resolve(res.json({
    //                 result: true,
    //                 title: 'Загрузка справок об образовании',
    //                 message: 'Файл принят успешно.',
    //                 return: '',
    //                 time: Date.now(),
    //             }));
    //         } catch(err) {
    //             reject(err);
    //         }
    //     });
    // }

    // static checkSettings(settings) {
    //     for (const key in settings.SetData) {
    //         if (!settings.SetData[key]) {
    //             console.log(1, key);
    //             return false;
    //         }
    //     }

    //     for (const key in settings.SetPassport) {
    //         if (!settings.SetPassport[key]) {
    //             console.log(2, key);
    //             return false;
    //         }
    //     }


    //     for (const key in settings.SetEdu[1][0]) {
    //         if (!settings.SetEdu[1][0][key]) {
    //             console.log(3, key, settings.SetEdu[1][0][key]);
    //             return false;
    //         }
    //     }

    //     return true;
    // }

    // static getOffers(req, res) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const findUser = await mongodb.aggregate('users', [
    //                 { $match: { _id: req.user._id } },
    //             ]);

    //             if(!findUser.length) {
    //                 return resolve(res.json({
    //                     result: false,
    //                     title: 'Получение пользователя',
    //                     message: 'Произошла ошибка при получении пользователя.',
    //                 }));
    //             }

    //             const findAccepted = await mongodb.aggregate('events', [
    //                 { $match: { members: { $elemMatch: { $eq: req.user._id } } } },
    //                 { $project: { _id: 1, name: 1, status: 'Принято' } },
    //             ]);

    //             const findPending = await mongodb.aggregate('events', [
    //                 { $match: { pending: { $elemMatch: { $eq: req.user._id } } } },
    //                 { $project: { _id: 1, name: 1, status: 'На рассмотрении' } },
    //             ]);

    //             let rejected = [];

    //             if (findUser[0].events) {
    //                 rejected = findUser[0].events.filter(value => value.status === 'rejected');
    //                 rejected = rejected.map(value => value.id);
    //             }

    //             const findRejected = await mongodb.aggregate('events', [
    //                 { $match: { _id: { $in: rejected } } },
    //                 { $project: { _id: 1, name: 1, status: 'Отклонено' } },
    //             ]);


    //             return resolve(res.json({
    //                 result: true,
    //                 data: [...findAccepted, ...findPending, ...findRejected],
    //             }));
    //         } catch(error) {
    //             console.log(error);
    //             return reject(res.json({
    //                 result: true,
    //                 title: 'Получение пользователя админом.',
    //                 message: error.message,
    //             }));
    //         }
    //     });
    // }

    // static updateSettings(req, res) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const id = req.params.id;

    //             const data = req.body;

    //             console.log(data);

    //             switch(id) {
    //                 case 'SetData':
    //                     Validator.object(data);
    //                     break;

    //                 case 'SetPassport':
    //                     Validator.object(data);
    //                     break;

    //                 case 'SetEdu':
    //                     Validator.array(data);
    //                     break;

    //                 case 'ArrayToggle':
    //                     Validator.array(data);
    //                     break;

    //                 case 'PrivateToggle':
    //                     Validator.array(data);
    //                     break;

    //                 default:
    //                     break;
    //             }

    //             console.log(req.user._id);

    //             const findUser = await mongodb.aggregate('users', [
    //                 { $match: { _id: req.user._id } },
    //             ]);

    //             console.log(11);

    //             if(!findUser.length) {
    //                 return resolve(res.json({
    //                     result: false,
    //                     title: 'Обновление настроек',
    //                     message: 'Произошла ошибка поиска пользователя.',
    //                 }));
    //             }

    //             findUser[0].settings[id] = req.body;

    //             mongodb.updateOne('users', { _id: req.user._id }, { $set: { settings: findUser[0].settings } });

    //             const checkSettings = this.checkSettings(findUser[0].settings);

    //             const getNotifications = await mongodb.aggregate('notifications', [
    //                 { $match: { _id: { $in: findUser[0].notifications } } },
    //             ]);

    //             const settingsIsEmpty = getNotifications.find(element => element.type === 'settingsRequire');

    //             console.log(checkSettings);

    //             if (checkSettings && settingsIsEmpty) {
    //                 let newNotifications = findUser[0].notifications;

    //                 console.log(newNotifications);

    //                 newNotifications = newNotifications.filter(id => id.toString() !== settingsIsEmpty._id.toString());

    //                 console.log(newNotifications);

    //                 await mongodb.updateOne('users', { _id: findUser[0]._id }, { $set: { notifications: newNotifications } });

    //                 await mongodb.deleteOne('notifications', { _id: settingsIsEmpty._id });
    //             }

    //             if (!checkSettings && !settingsIsEmpty) {
    //                 const insertedNotification = await mongodb.insertOne('notifications', {
    //                     type: 'settingsRequire',
    //                     userId: findUser[0]._id,
    //                     message: 'Заполните данные в разделе',
    //                 });

    //                 const notificationsIfEmpty = findUser[0].notifications.concat(insertedNotification.insertedId);

    //                 await mongodb.updateOne('users', { _id: findUser[0]._id }, { $set: { notifications: notificationsIfEmpty } });
    //             }

    //             return resolve(res.json({
    //                 result: true,
    //                 title: 'Обновление настроек',
    //                 message: 'Настройки обновлены.',
    //             }));
    //         } catch(err) {
    //             reject(err);
    //         }
    //     });
    // }

    // static getUser(req, res) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const findUser = await mongodb.aggregate('users', [
    //                 { $match: { _id: req.user._id } },
    //             ]);

    //             if(!findUser.length) {
    //                 return resolve(res.json({
    //                     result: false,
    //                     title: 'Получение пользователя',
    //                     message: 'Произошла ошибка при получении пользователя.',
    //                 }));
    //             }

    //             let teams = [];
    //             let userWithTeams = findUser[0];

    //             if(findUser[0].teams) {
    //                 teams = await mongodb.aggregate('teams', [
    //                     { $match: { _id: { $in: findUser[0].teams } } },
    //                 ]);

    //                 let idList = [];

    //                 for (const teamsValues of teams) {
    //                     for (const member of teamsValues.members) {
    //                         idList.push(member.idMember);
    //                     }
    //                 }

    //                 idList = idList.map(value => value.toString());

    //                 let uniqueIdList = Array.from(new Set(idList));

    //                 uniqueIdList = uniqueIdList.map(value => mongodb.id(value));

    //                 const userList = await mongodb.aggregate('users', [
    //                     { $match: { _id: { $in: uniqueIdList } } },
    //                 ]);

    //                 let userObj = {};

    //                 for(const user of userList) {
    //                     userObj = {
    //                         [user._id.toString()]: {
    //                             idMember: user._id,
    //                             firstName: user.settings.SetData.Name,
    //                             middleName: user.settings.SetData.SurName,
    //                             lastName: user.settings.SetData.Fam,
    //                             mail: user.settings.SetData.Email,
    //                             phoneNumber: user.settings.SetData.NumbOfTelephone,
    //                             faculty: user.settings.SetEdu[1][0].Facultet,
    //                             group: user.settings.SetEdu[1][0].GroupUn,
    //                             vkLink: user.settings.SetData.Vk,
    //                             facebookLink: user.settings.SetData.Fb,
    //                             instLink: user.settings.SetData.Inst,
    //                         },
    //                         ...userObj,
    //                     };
    //                 }

    //                 for (const team of teams) {
    //                     team.members = team.members.map(member => ({ ...userObj[member.idMember.toString()], position: member.position, captain: member.captain }));
    //                 }

    //                 userWithTeams = { ...findUser[0], teams };
    //             }

    //             // if (findUser[0].notifications) {
    //             //     const newNot = [];

    //             //     for (const value of findUser[0].notifications) {
    //             //         const notification = await mongodb.aggregate('notifications', [{
    //             //             $match: { _id: value },
    //             //         }]);
    //             //         if (!notification[0].hidden)
    //             //             if (notification[0].inviter) {
    //             //                 const inviterFind = await mongodb.aggregate('users', [{
    //             //                     $match: { _id: notification[0].inviter },
    //             //                 }]);

    //             //                 if(inviterFind.length) {
    //             //                     const inviterName = `${inviterFind[0].settings.SetData.Name} ${inviterFind[0].settings.SetData.Fam}`;
    //             //                     newNot.push({ ...notification[0], inviterName });
    //             //                 }
    //             //             }else newNot.push({ ...notification[0] });
    //             //     }
    //             // }

    //             if (findUser[0].projects) {
    //                 const newProjects = await mongodb.aggregate('projects', [{
    //                     $match: { _id: { $in: findUser[0].projects } },
    //                 }]);

    //                 // for (const value of findUser[0].projects) {
    //                 //     const project = await mongodb.aggregate('projects', [{
    //                 //         $match: { _id: value },
    //                 //     }]);

    //                 //     newProjects.push(project[0]);
    //                 // }

    //                 console.log(newProjects);

    //                 userWithTeams = { ...userWithTeams, projects: newProjects };
    //             }

    //             return resolve(res.json({
    //                 result: true,
    //                 user: userWithTeams,
    //             }));
    //         } catch(error) {
    //             reject(error);
    //         }
    //     });
    // }
}

module.exports = vegController;
