import membershipModel from "./models/membership.js";

export default class MembershipsDao {

    getMemberships = (params) =>{
        return membershipModel.find(params).lean();
    }

    getMembershipBy = (params) =>{
        return membershipModel.findOne(params).lean();
    }

    createMembership = async(membership) =>{
        const result = await membershipModel.create(membership);
        return result.toObject();
    }

    updateMembership = (id,membership) =>{
        return membershipModel.updateOne({_id:id},membership);
    }

    bulkUpdate = (bulkInfo) => {
        return membershipModel.bulkWrite(bulkInfo);
    }

    deleteMembership =(id) =>{
        return membershipModel.deleteOne({_id:id});
    }
}