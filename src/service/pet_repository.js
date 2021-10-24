import {
  getDatabase,
  ref,
  update,
  remove,
  onValue,
  off,
} from "firebase/database";

class PetRepository {
  constructor(app) {
    this.database = getDatabase(app);
  }
  savePet(userId, pet) {
    update(ref(this.database, `users/${userId}/pet`), {
      [pet.id]: pet,
    });
  }

  syncPets(userId, onPetUpdate) {
    const petRef = ref(this.database, `users/${userId}/pet`);
    onValue(petRef, snapshot => {
      const data = snapshot.val();
      data && onPetUpdate(data);
    });
    return () => off(petRef);
  }

  removePet(userId, pet) {
    remove(ref(this.database, `users/${userId}/pet/${pet.id}`));
  }
}

export default PetRepository;
