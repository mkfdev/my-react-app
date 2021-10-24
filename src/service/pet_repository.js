import { database } from "./firebase";
import { ref, update, remove, onValue } from "firebase/database";

class PetRepository {
  savePet(userId, pet) {
    update(ref(database, `users/${userId}/pet`), {
      [pet.id]: pet,
    });
  }

  syncPets(userId, onPetUpdate) {
    const petRef = ref(database, `users/${userId}/pet`);
    onValue(petRef, snapshot => {
      const data = snapshot.val();
      data && onPetUpdate(data);
    });
    // TODO:에러(off)
    // return () => ref.off();
  }

  removePet(userId, pet) {
    remove(ref(database, `users/${userId}/pet/${pet.id}`));
  }
}

export default PetRepository;
