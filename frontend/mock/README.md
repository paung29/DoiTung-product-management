# Mock Data Documentation

This directory contains normalized mock JSON files for the DoiTung Product Management application. Each file represents a database table with realistic sample data.

## File Structure

### Core Tables

#### `accounts.json`

- **Purpose**: User accounts and roles
- **Fields**: `account_id`, `name`, `email`, `password`, `role_on_db`
- **Records**: 3 (1 Admin, 2 Staff)
- **FK Relations**: Used by all form records via `recorded_by`

#### `movement-types.json`

- **Purpose**: Stock movement types (ENTRY-CHIT, ISSUANCE, RETURN, ADJUSTMENT)
- **Fields**: `movement_type_id`, `movement_type`, `description`
- **Records**: 4

#### `stock-locations.json`

- **Purpose**: Physical storage locations
- **Fields**: `location_id`, `location_name`
- **Records**: 5

#### `block-movements.json`

- **Purpose**: Stock movement transactions
- **Fields**: `movement_id`, `location_id` (FK), `movement_type_id` (FK), `stock_name`, `stock_item_id`, `quantity_in_grams`, `price_per_gram`, `recorded_by` (FK), `recorded_date`
- **Records**: 3

#### `conditions.json`

- **Purpose**: Vanilla pod conditions
- **Fields**: `condition_id`, `condition` (GOOD, INJECT, ROTTEN)
- **Records**: 3

### Hierarchical Location Structure

These tables form a hierarchy: **Year → Zone → Pole → Cluster**

#### `years.json`

- **Purpose**: Harvest years
- **Fields**: `year_id`, `year`
- **Records**: 3 (2024, 2025, 2026)

#### `zones.json`

- **Purpose**: Geographic zones within a year
- **Fields**: `zone_id`, `year_id` (FK), `zone_no`, `zone_name`
- **Records**: 4 (3 zones in 2026, 1 zone in 2025)

#### `poles.json`

- **Purpose**: Poles within zones
- **Fields**: `pole_id`, `zone_id` (FK), `pole_name`, `unique_code_id` (P-00001, etc.)
- **Records**: 6

#### `clusters.json`

- **Purpose**: Clusters on poles
- **Fields**: `cluster_id`, `pole_id` (FK), `cluster_no`, `unique_code_id` (C-00001, etc.)
- **Records**: 6

#### `year-form-settings.json`

- **Purpose**: Settings/configuration for each year's forms
- **Fields**: `year_id` (FK), `yod_status`, `yof_uri_on_folderscan`, `yoer_admin_folderscan`
- **Records**: 2

### Recording Forms

Each form has a many-to-one relationship with **Cluster** and includes `cluster_id` (FK) and `recorded_by` (FK to accounts).

#### `cluster-forms.json`

- **Purpose**: Cluster recording and grading
- **Fields**: `cluster_form_id`, `cluster_id` (FK), `recorded_by` (FK), `recorded_date`, `number_of_pistil_id`, `grade`, `inspection_type_grum`, `price_per_gram`, `details`
- **Records**: 4

#### `flower-forms.json`

- **Purpose**: Flower counting and health tracking
- **Fields**: `flower_form_id`, `cluster_id` (FK), `recorded_by` (FK), `recorded_date`, `number_of_flower`, `healthy_flower`, `defected_flower`, `details`
- **Records**: 4

#### `pod-forms.json`

- **Purpose**: Pod formation tracking
- **Fields**: `pod_form_id`, `cluster_id` (FK), `recorded_by` (FK), `recorded_date`, `number_of_pod`, `pod_no`, `unique_code_id`
- **Records**: 5

#### `pollen-forms.json`

- **Purpose**: Pollen/pollination status tracking
- **Fields**: `pollen_form_id`, `cluster_id` (FK), `recorded_by` (FK), `recorded_date`, `unsaturated_pollination`, `good_flowers`, `condition`
- **Records**: 4

#### `pollination-forms.json`

- **Purpose**: Pollination event recording
- **Fields**: `pollination_form_id`, `cluster_id` (FK), `recorded_by` (FK), `recorded_date`, `unsaturated_pollination`, `pod_flowers`, `details`
- **Records**: 4

#### `pre-harvest-forms.json`

- **Purpose**: Pre-harvest assessment
- **Fields**: `pre_harvest_form_id`, `cluster_id` (FK), `recorded_by` (FK), `recorded_date`, `number_of_pods`, `pre_harvest_pods`, `rotten_pods`, `details`
- **Records**: 4

#### `harvest-forms.json`

- **Purpose**: Harvest grading and yield recording
- **Fields**: `harvest_form_id`, `cluster_id` (FK), `recorded_by` (FK), `recorded_date`, `grade_a_plus_count`, `grade_a_plus_weight`, `grade_a_count`, `grade_a_weight`, `grade_b_count`, `grade_b_weight`, `grade_c_count`, `grade_c_weight`, `grade_d_plus_count`, `grade_d_plus_weight`, `details`
- **Records**: 4

## Key Relationships

### Foreign Keys Summary

- **All forms** → `cluster_id` → `clusters.json`
- **All forms** → `recorded_by` → `accounts.json`
- **clusters** → `pole_id` → `poles.json`
- **poles** → `zone_id` → `zones.json`
- **zones** → `year_id` → `years.json`
- **block-movements** → `location_id` → `stock-locations.json`
- **block-movements** → `movement_type_id` → `movement-types.json`
- **block-movements** → `recorded_by` → `accounts.json`
- **year-form-settings** → `year_id` → `years.json`

## Sample Data Consistency

- **Accounts**:
  - ACC001 (Admin) - occasional recorder
  - ACC002 (Staff) - frequent recorder
  - ACC003 (Staff) - frequent recorder

- **Clusters**: 6 clusters distributed across 3 poles in Zone 1, 2 poles in Zone 2, 1 pole in Zone 3
- **Forms**: Each cluster has complete form records from cluster → flower → pod → pollen → pollination → pre-harvest → harvest

- **Harvest Grades**: Realistic grade distribution (A+ = premium, A = high, B = medium, C = standard, D+ = lower quality)

- **Dates**: Sequential from early February (cluster forms) through June (harvest forms)

## Usage

Import these files into your Next.js application for:

- **Development**: Testing UI components with realistic data
- **Testing**: Integration tests without a live database
- **Demo**: Presenting features to stakeholders
- **Documentation**: Understanding the data model

## Notes

- All IDs follow patterns (e.g., ACC001, CLUSTER001) for easy identification
- Dates are realistic and sequential to demonstrate workflows
- Foreign key consistency is maintained across all files
- Weight values are in grams; prices are realistic for vanilla production
- Record counts are sufficient for grid/list pagination testing
