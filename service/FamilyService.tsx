import { firestore } from "@/firebase/config";
import { FamilyData, User } from "@/utils/types";
import { addDoc, collection } from "firebase/firestore";


class FamilyService { 

    async createFamily(familyData: FamilyData , user: User) {
        try {
           const familyId = `${user.villageCode}_FAM${Date.now()
             .toString()
                .slice(-6)}`;
            
            const familyRef = await addDoc(collection(firestore, "families"), { id: familyId, ...familyData });
            
            return familyRef.id;
        } catch (error) {
            return error;
        }
    }
}