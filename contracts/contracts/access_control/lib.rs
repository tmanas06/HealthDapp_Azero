use aleph_zero_contracts::prelude::*;
use ink::storage::Mapping;

#[ink::contract]
mod access_control {
    use super::*;

    #[derive(Encode, Decode, scale_info::TypeInfo)]
    pub struct AccessGrant {
        pub grantee: AccountId,
        pub expiration: Timestamp,
        pub permissions: u8,
    }

    #[ink(storage)]
    pub struct AccessControl {
        grants: Mapping<Hash, Vec<AccessGrant>>,
    }

    impl AccessControl {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                grants: Default::default(),
            }
        }

        #[ink(message)]
        pub fn grant_access(
            &mut self,
            resource_id: Hash,
            grantee: AccountId,
            duration: Timestamp,
            permissions: u8,
        ) -> Result<(), Error> {
            let caller = self.env().caller();
            let expiration = self.env().block_timestamp() + duration;
            let grant = AccessGrant {
                grantee,
                expiration,
                permissions,
            };

            let mut grants = self.grants.get(resource_id).unwrap_or_default();
            grants.push(grant);
            self.grants.insert(resource_id, &grants);

            Ok(())
        }

        #[ink(message)]
        pub fn revoke_access(&mut self, resource_id: Hash, grantee: AccountId) -> Result<(), Error>