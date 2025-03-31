use aleph_zero_contracts::prelude::*;
use scale::{Decode, Encode};

#[ink::contract]
mod ai_manager {
    use super::*;

    #[derive(Encode, Decode, scale_info::TypeInfo)]
    pub struct Model {
        pub owner: AccountId,
        pub model_hash: Hash,
        pub training_status: u8,
        pub last_trained: Timestamp,
    }

    #[ink(storage)]
    pub struct AIManager {
        models: Mapping<Hash, Model>,
        training_requests: Mapping<Hash, Vec<AccountId>>,
        model_count: u64,
    }

    impl AIManager {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                models: Default::default(),
                training_requests: Default::default(),
                model_count: 0,
            }
        }

        #[ink(message)]
        pub fn register_model(&mut self, model_hash: Hash) -> Result<Hash, Error> {
            let caller = self.env().caller();
            let model_id = self.env().hash_encoded(&self.model_count);
            self.model_count += 1;

            let model = Model {
                owner: caller,
                model_hash,
                training_status: 0,
                last_trained: self.env().block_timestamp(),
            };

            self.models.insert(model_id, &model);
            Ok(model_id)
        }

        #[ink(message)]
        pub fn request_training(&mut self, model_id: Hash, data_hash: Hash) -> Result<(), Error> {
            let caller = self.env().caller();
            let mut requests = self.training_requests.get(model_id).unwrap_or_default();
            requests.push(caller);
            self.training_requests.insert(model_id, &requests);

            // Update model status
            if let Some(mut model) = self.models.get(model_id) {
                model.training_status = 1;
                self.models.insert(model_id, &model);
            }

            Ok(())
        }

        #[ink(message)]
        pub fn get_model_status(&self, model_id: Hash) -> Option<Model> {
            self.models.get(model_id)
        }
    }
}