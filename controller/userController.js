import User from '../model/user.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import fs from 'fs'
import LoginHistory from '../model/loginHistory.js';
dotenv.config()
const roles = "ustad"
const role = "agen"

export const me = async (req, res) => {
    const token = await req.cookies._auth
    if (token) {
        try {
            jwt.verify(token, process.env.SECRETKEY, async (err, decode) => {
                await User.findOne({
                    where: {
                        id: decode.id
                    }
                }).then(response => {
                    res.status(200).json({
                        data: response
                    })
                }).catch(err => {
                    res.status(404).json({
                        message: err
                    })
                })
            })
        } catch (err) {
            res.status(404).json({
                message: err
            })
        }
    }else{
        res.status(404).json({
            message: err
        })
    }
}

export const getAllAgen = async (req, res) => {
    try {
        var userData = await User.findAll({
            attributes: { exclude: ['password'] },
            where: {
                role: "agen"
            }
        })
        res.status(200).json({
            userData
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    }
};

export const getAllUstad = async (req, res) => {
    try {
        var userData = await User.findAll({
            attributes: { exclude: ['password'] },
            where: {
                role: roles
            }
        })
        res.status(200).json({
            userData
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    }
};

export const createAgen = async (req, res) => {
    try {
        var user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!user) {
            await User.create({
                no_ktp: req.body.no_ktp,
                nama: req.body.nama,
                alamat: req.body.alamat,
                no_telepon: req.body.no_telepon,
                role: role,
                username: req.body.username,
                password: await argon2.hash(req.body.password)
            })
            return res.status(201).json({
                message: "Succes Menambah Agen"
            })
        } else {
            return res.status(409).json({
                message: "Username sudah dipakai !"
            })
        }
    } catch (err) {
        return res.status(409).json({
            message: "No ktp sudah ada !"
        })
    }
}

export const fotoAgen = async (req, res) => {
    try {
        await User.findOne({
            where: {
                id: req.params['id']
            }
        }).then(respone => {
            res.status(200).json({
                datas: req.file
            })
        }).catch(err => {
            res.status(404).json({
                message: err
            })
            console.log(respon)
        })
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
}

export const createUstad = async (req, res) => {
    try {
        var user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!user) {
            await User.create({
                no_ktp: req.body.no_ktp,
                nama: req.body.nama,
                alamat: req.body.alamat,
                no_telepon: req.body.no_telepon,
                role: roles,
                username: req.body.username,
                password: await argon2.hash(req.body.password)
            })
            return res.status(201).json({
                message: "Succes Menambah Ustad"
            })
        } else {
            return res.status(409).json({
                message: "Username sudah dipakai !"
            })
        }
    } catch (err) {
        return res.status(409).json({
            message: "No ktp sudah ada !"
        })
    }
}

export const editUstad = async (req, res) => {
    const token = await req.cookies._auth
    if (token) {
        try {
            jwt.verify(token, process.env.SECRETKEY, async (err, decode) => {
                console.log(token, err)
                var role = await User.findOne({
                    where: {
                        id: decode.id
                    }
                })
                if (role.role !== "admin" && role.role !== "ustad") {
                    return res.json({
                        "message": "Anda Tidak memiliki akses!"
                    })
                }
                var user = await User.findOne({
                    where: {
                        username: req.body.username
                    }
                })
                if (req.body.password == "") {
                    await User.update({
                        no_ktp: req.body.no_ktp,
                        nama: req.body.nama,
                        alamat: req.body.alamat,
                        no_telepon: req.body.no_telepon,
                        username: req.body.username,
                    }, {
                        where: {
                            id: req.body.id,
                            role: "ustad"
                        }
                    }).then(() => {
                        return res.status(201).json({
                            "message": "succes update agen",
                        })
                    }).catch(() => {
                        return res.status(409).json({
                            message: "Username atau Ktp sudah terdaftar!"
                        })
                    })
                } else if (!user || user.username != req.body.username) {
                    await User.update({
                        nama: req.body.nama,
                        username: req.body.username,
                        password: await argon2.hash(req.body.password)
                    }, {
                        where: {
                            id: req.body.id,
                            role: "ustad"
                        }
                    }).then(() => {
                        return res.status(201).json({
                            "message": "succes update ustad",
                        })
                    }).catch(() => {
                        return res.status(409).json({
                            message: "User telah terdaftar !"
                        })
                    })
    
                } else if (req.body.username == user.username) {
                    await User.update({
                        nama: req.body.nama,
                        password: await argon2.hash(req.body.password)
                    }, {
                        where: {
                            id: req.body.id,
                            role: "ustad"
                        }
                    })
                    return res.status(201).json({
                        "message": "succes update ustad",
                    })
                }
                else {
                    res.status(409).json({
                        message: "User telah terdaftar!"
                    })
                }
            })
        } catch (err) {
            res.status(409).json({
                message: "Error"
            })
        }
    }else{
        res.status(409).json({
            message: "Error"
        })
    }
}

export const setImage = async (req, res) => {
    try {
        var data = await User.findOne({
            where: {
                id: req.body.id
            }
        })
        if (data.foto !== null ) {
            fs.unlinkSync(`./${data.foto}`)
            await User.update({
                foto: req.file.path
            }, {
                where: {
                    id: req.body.id
                }
            }).then(respon => {
                res.status(200).json({
                    message: respon + req.file.path
                })
            })
            /*if (data) {
                await User.update({
                    foto: req.file.path
                }, {
                    where: {
                        id: req.body.id
                    }
                }).then(respon => {
                    res.status(200).json({
                        message: respon + req.file.path
                    })
                })
            } else {
                res.status(404).json({
                    message: "User Not Found!"
                })
            }*/
        }else if(data.foto == null){
            await User.update({
                foto: req.file.path
            }, {
                where: {
                    id: req.body.id
                }
            }).then(respon => {
                res.status(200).json({
                    message: respon + req.file.path
                })
            })
        }
    } catch (err) {
        res.status(404).json({
            message: err
        })
    }
}

export const editAgen = async (req, res) => {
    const token = await req.cookies._auth
    if (token) {
        try {
            jwt.verify(token, process.env.SECRETKEY, async (err, decode) => {
                console.log(token, err)
                var role = await User.findOne({
                    where: {
                        id: decode.id
                    }
                })
                if (role.role !== "admin" && role.role !== 'agen') {
                    return res.json({
                        "message": "Anda Tidak memiliki akses!"
                    })
                }
                var user = await User.findOne({
                    where: {
                        username: req.body.username
                    }
                })
                if (req.body.password == "") {
                    await User.update({
                        no_ktp: req.body.no_ktp,
                        nama: req.body.nama,
                        alamat: req.body.alamat,
                        no_telepon: req.body.no_telepon,
                        username: req.body.username,
                    }, {
                        where: {
                            id: req.body.id,
                            role: "agen"
                        }
                    }).then(() => {
                        return res.status(201).json({
                            "message": "succes update agen",
                        })
                    }).catch(() => {
                        return res.status(401).json({
                            message: "Username atau Ktp Telah Terdaftar!"
                        })
                    })
                } else if (!user || user.username != req.body.username) {
                    await User.update({
                        nama: req.body.nama,
                        username: req.body.username,
                        password: await argon2.hash(req.body.password)
                    }, {
                        where: {
                            id: req.body.id,
                            role: "agen"
                        }
                    }).then(() => {
                        return res.status(201).json({
                            "message": "succes update agen",
                        })
                    }).catch(() => {
                        return res.status(402).json({
                            message: "User telah terdaftar !"
                        })
                    })
    
                } else if (req.body.username == user.username) {
                    await User.update({
                        nama: req.body.nama,
                        password: await argon2.hash(req.body.password)
                    }, {
                        where: {
                            id: req.body.id,
                            role: "agen"
                        }
                    }).then(()=>{
                        return res.status(201).json({
                            "message": "succes update agen",
                        })
                    }).catch(()=>{
                        return res.status(201).json({
                            "message": "Username Telah Terdaftar!",
                        })
                    })
                }
                else {
                    res.status(403).json({
                        message: "User telah terdaftar!"
                    })
                }
            })
        } catch (err) {
            res.status(404).json({
                message: "Error"
            })
        }
    }else{
        res.status(405).json({
            message: "Error"
        })
    }
}

export const editAdmin = async (req, res) => {
    const token = await req.cookies._auth
    if (token) {
        try {
            jwt.verify(token, process.env.SECRETKEY, async (err, decode) => {
                console.log(token, err)
                var role = await User.findOne({
                    where: {
                        id: decode.id
                    }
                })
                if (role.role !== "admin") {
                    return res.json({
                        "message": "Anda Tidak memiliki akses!"
                    })
                }
                var user = await User.findOne({
                    where: {
                        username: req.body.username
                    }
                })
                if (req.body.password == "") {
                    await User.update({
                        nama: req.body.nama,
                        username: req.body.username,
                    }, {
                        where: {
                            id: decode.id,
                            role: "admin"
                        }
                    }).then(() => {
                        return res.status(201).json({
                            "message": "succes update admin",
                        })
                    }).catch(() => {
                        return res.status(409).json({
                            message: "User telah terdaftar !"
                        })
                    })
                } else if (!user || user.username != decode.id) {
                    await User.update({
                        nama: req.body.nama,
                        username: req.body.username,
                        password: await argon2.hash(req.body.password)
                    }, {
                        where: {
                            id: decode.id,
                            role: "admin"
                        }
                    }).then(() => {
                        return res.status(201).json({
                            "message": "succes update admin",
                        })
                    }).catch(() => {
                        return res.status(409).json({
                            message: "User telah terdaftar !"
                        })
                    })
    
                } else if (decode.id == user.username) {
                    await User.update({
                        nama: req.body.nama,
                        password: await argon2.hash(req.body.password)
                    }, {
                        where: {
                            id: decode.id,
                            role: "admin"
                        }
                    })
                    return res.status(201).json({
                        "message": "succes update admin",
                    })
                }
                else {
                    res.status(409).json({
                        message: "User telah terdaftar!"
                    })
                }
            })
        } catch (err) {
            return res.status(409).json({
                message: err.code
            })
        }
    }else{
        return res.status(409).json({
            message: err.code
        })
    }
}

export const getAgenById = async (req, res) => {
    try {
        var data = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params['id'],
                role: role
            }
        });
        if (data == null) {
            res.status(404).json({
                message: "user not found!"
            })
        } else {
            res.status(200).json({
                data
            })
        }
    } catch (err) {
        res.status(404).json({
            err
        })
    }
}

export const deleteUstad = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.body.id,
                role: "ustad"
            }
        }).then(() => {
            res.status(202).json({
                message: "sukses hapus agen"
            })
        })
    } catch (err) {
        res.json({
            err
        })
    }
}

export const deleteAgen = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.body.id,
                role: "agen"
            }
        }).then(() => {
            res.status(202).json({
                message: "sukses hapus agen"
            })
        })
    } catch (err) {
        res.json({
            err
        })
    }
}

export const getUstadById = async (req, res) => {
    try {
        var data = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params['id'],
                role: roles
            }
        });
        if (data == null) {
            res.status(404).json({
                message: "user not found!"
            })
        } else {
            res.status(200).json({
                data
            })
        }
    } catch (err) {
        res.status(404).json({
            err
        })
    }
}

export const Login = async (req, res) => {
    try {
        var username = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (username) {
            var valid = await argon2.verify(username.password, req.body.password)
            if (valid) {
                await LoginHistory.create({
                    userId: username.id
                })
                const token = jwt.sign({ id: username.id }, process.env.SECRETKEY, { expiresIn: 30 * 60 })
                res.status(200).json({
                    token: token,
                    role: username.role
                })
            } else {
                res.status(404).json({
                    message: "Username atau Password Anda Salah!"
                })
            }
        } else {
            res.status(404).json({
                message: "Username atau Password Anda Salah!"
            })
        }
    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}
