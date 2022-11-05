import { Role } from '../models/index.js'

export const createRoles =  async () => {
    const lnght = await Role.estimatedDocumentCount()

    if (lnght > 0) return

    const roles = await Promise.all([
        new Role({name: 'user'}).save(),
        new Role({name: 'admin'}).save()
    ])

    console.log('roles created');
}