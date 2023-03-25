import {createAsyncThunk} from "@reduxjs/toolkit"
import * as service from "./Position-service"

export const findPositionsThunk = createAsyncThunk(
    'positions/findPositions', async () =>
    {
        return  await service.findPositions()

    }

)


export const deletePositionThunk = createAsyncThunk(
    'positions/deletePosition',
    async (positionId) => {
        await service.deletePosition(positionId)
        return positionId
    })



export const createPositionThunk = createAsyncThunk(
    'positions/createPosition', async (position) =>
        await service.createPosition(position)
)

export const updatePositionThunk = createAsyncThunk(
    'positions/updatePosition',
    async (position) =>
        await service.updatePosition(position)
)
