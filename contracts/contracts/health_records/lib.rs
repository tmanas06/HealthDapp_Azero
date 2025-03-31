use aleph_zero_contracts::prelude::*;
use scale::{Decode, Encode};
use ink::storage::Mapping;

#[derive(Encode, Decode, scale_info::TypeInfo)]
pub struct HealthRecord {
    pub patient_id: AccountId,
    pub data_hash: Hash,
    pub timestamp: Timestamp,
    pub access_grants: Vec<(AccountId, Timestamp)>, // (grantee, expiration)
}

#[ink::contract]
mod health_records {
    // ... (implementation as shown earlier)
}