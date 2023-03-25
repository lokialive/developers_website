import {createAsyncThunk} from "@reduxjs/toolkit"
import * as service from "./savedItem-service"

export const findSavedItemsThunk = createAsyncThunk(
    'savedItems/findSavedItems', async () =>
    {
        return  await service.findSavedItems()

    }

)


export const deleteSavedItemThunk = createAsyncThunk(
    'savedItems/deleteSavedItem',
    async (savedItemId) => {
        await service.deleteSavedItem(savedItemId)
        return savedItemId
    })



export const createSavedItemThunk = createAsyncThunk(
    'savedItems/createSavedItem', async (savedItem) =>
        await service.createSavedItem(savedItem)
)

export const updateSavedItemThunk = createAsyncThunk(
    'savedItems/updateSavedItem',
    async (savedItem) =>
        await service.updateSavedItem(savedItem)
)
