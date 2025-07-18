export class GeoEntity {
    constructor(
        public readonly status?: string,
        public readonly country?: string,
        public readonly countryCode?: string,
        public readonly city?: string,
        public readonly timezone?: string,
    ){}
}