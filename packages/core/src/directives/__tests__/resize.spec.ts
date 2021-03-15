import { resize } from '../resize'
import { DirectiveContext } from '../../types'
import { applyTransforms } from '../../apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('width', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "width"', () => {
        const res = resize({ width: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keyword "w"', () => {
        const res = resize({ w: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = resize({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = resize({ width: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = resize({ width: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = resize({ width: '300' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('rounds float to int', () => {
            const res = resize({ height: '300.75' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('100', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ width: '100' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('400', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ width: '400' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })
    })
})

describe('height', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "height"', () => {
        const res = resize({ height: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keyword "h"', () => {
        const res = resize({ h: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = resize({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = resize({ height: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = resize({ height: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = resize({ height: '300' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('rounds float to int', () => {
            const res = resize({ height: '300.75' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('100', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ height: '100' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('400', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ height: '400' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })
    })
})

describe('width & height', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keywords "width" & "height"', () => {
        const res = resize({ width: '300', height: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keywords "w" & "h"', () => {
        const res = resize({ w: '300', h: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keywords "width" & "h"', () => {
        const res = resize({ width: '300', h: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('keywords "w" & "height"', () => {
        const res = resize({ w: '300', height: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('basic', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ w: '300', h: '300' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('w/ fit', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ w: '300', h: '300', fit: 'contain' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('w/ fit & background', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ w: '300', h: '300', fit: 'contain', background: '0f0' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('w/ fit and position', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ w: '300', h: '300', fit: 'cover', position: 'top' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('w/ kernel', async () => {
            //@ts-ignore
            const out = await applyTransforms([resize({ w: '300', h: '300', kernel: 'cubic' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })
    })
})