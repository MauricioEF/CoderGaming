
export default class MembershipsRepository {
    constructor(dao){
        this.dao = dao;
    }

    getMemberships = (params) =>{
        return this.dao.getMemberships(params)
    }

    getMembershipBy = (params) =>{
        return this.dao.getMembershipBy(params)
    }

    createMembership = async(membership) =>{
        return await this.dao.createMembership(membership);
    }

    updateMembership = (id,membership) =>{
        return this.dao.updateMembership({_id:id},membership);
    }

    bulkUpdate = (memberships,updateBody) => {
        const bulkOperation = [];
        memberships.forEach(membership=>{
            const updateDocInfo = {
                'updateOne':{
                    'filter':{_id:membership._id},
                    'update': updateBody,
                    'upsert':false
                }
            }
            bulkOperation.push(updateDocInfo);
        })
        return this.dao.bulkUpdate(bulkOperation);
    }

    deleteMembership =(id) =>{
        return this.dao.deleteMembership({_id:id});
    }

}