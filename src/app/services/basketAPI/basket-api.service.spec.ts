import { TestBed } from '@angular/core/testing'

import { BasketAPIService } from './basket-api.service'

describe('BasketAPIService', () => {
    let service: BasketAPIService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(BasketAPIService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
