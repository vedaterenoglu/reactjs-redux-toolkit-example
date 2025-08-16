# 🏪 State Management Guide

Comprehensive guide to Redux Toolkit state management patterns and best practices.

## Redux Toolkit Overview

This project demonstrates modern Redux patterns using Redux Toolkit (RTK), significantly reducing boilerplate compared to traditional Redux.

### Store Configuration

```typescript
// store/index.ts
export const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
    cities: citySlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(apiSlice.middleware)
})
```

## 📦 Feature Slices

### Event Slice

Complete event management with Redux Toolkit:

```typescript
const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    filteredEvents: [],
    selectedEvent: null,
    searchQuery: '',
    isLoading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 12
  },
  reducers: {
    // Synchronous actions
    setEvents: (state, action) => {
      state.events = action.payload
      state.filteredEvents = action.payload
    },
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      // Filter events based on search
      state.filteredEvents = state.events.filter(event =>
        event.name.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: (builder) => {
    // Handle async thunks
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.events = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})
```

### City Slice

City selection and filtering:

```typescript
const citySlice = createSlice({
  name: 'cities',
  initialState: {
    cities: [],
    selectedCity: null,
    isLoading: false,
    error: null
  },
  reducers: {
    selectCity: (state, action) => {
      state.selectedCity = action.payload
    },
    clearCitySelection: (state) => {
      state.selectedCity = null
    }
  }
})
```

## 🔄 RTK Query Integration

### API Slice with Caching

```typescript
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  tagTypes: ['Event', 'EventList', 'City'],
  endpoints: (builder) => ({
    // Query with caching
    getEvents: builder.query<Event[], EventParams>({
      query: (params) => ({
        url: '/events',
        params
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ slug }) => ({ type: 'Event' as const, id: slug })),
              { type: 'EventList' as const }
            ]
          : [{ type: 'EventList' as const }],
      keepUnusedDataFor: 300 // 5 minutes
    }),
    
    // Mutation with cache invalidation
    createEvent: builder.mutation<Event, Partial<Event>>({
      query: (event) => ({
        url: '/events',
        method: 'POST',
        body: event
      }),
      invalidatesTags: ['EventList']
    })
  })
})
```

## 🎣 Custom Hooks

### Typed Redux Hooks

```typescript
// store/hooks.ts
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### Domain-Specific Hooks

```typescript
// Event management hook
export const useEventManagement = () => {
  const dispatch = useAppDispatch()
  const events = useAppSelector(state => state.events.filteredEvents)
  const selectedEvent = useAppSelector(state => state.events.selectedEvent)
  const isLoading = useAppSelector(state => state.events.isLoading)
  
  const selectEvent = useCallback((event: Event) => {
    dispatch(eventActions.selectEvent(event))
  }, [dispatch])
  
  const searchEvents = useCallback((query: string) => {
    dispatch(eventActions.setSearchQuery(query))
  }, [dispatch])
  
  return {
    events,
    selectedEvent,
    isLoading,
    selectEvent,
    searchEvents
  }
}
```

## 🎯 Selectors

### Basic Selectors

```typescript
// Simple selectors
export const selectAllEvents = (state: RootState) => state.events.events
export const selectSelectedEvent = (state: RootState) => state.events.selectedEvent
export const selectIsLoading = (state: RootState) => state.events.isLoading
```

### Memoized Selectors

```typescript
import { createSelector } from '@reduxjs/toolkit'

// Memoized selector for filtered events
export const selectFilteredEvents = createSelector(
  [selectAllEvents, selectSearchQuery, selectSelectedCity],
  (events, searchQuery, selectedCity) => {
    let filtered = events
    
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (selectedCity) {
      filtered = filtered.filter(event => 
        event.city === selectedCity
      )
    }
    
    return filtered
  }
)

// Paginated events selector
export const selectPaginatedEvents = createSelector(
  [selectFilteredEvents, selectCurrentPage, selectItemsPerPage],
  (events, page, itemsPerPage) => {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    return events.slice(start, end)
  }
)
```

## 🔄 Async Actions

### Create Async Thunk

```typescript
// Async thunk for fetching events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params: EventParams, { rejectWithValue }) => {
    try {
      const response = await eventApiService.getEvents(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk with condition
export const fetchEventIfNeeded = createAsyncThunk(
  'events/fetchEventIfNeeded',
  async (slug: string, { getState }) => {
    const state = getState() as RootState
    const existingEvent = state.events.events.find(e => e.slug === slug)
    
    if (existingEvent) {
      return existingEvent
    }
    
    return eventApiService.getEventBySlug(slug)
  },
  {
    condition: (slug, { getState }) => {
      const state = getState() as RootState
      // Skip if already loading
      return !state.events.isLoading
    }
  }
)
```

## 💾 State Persistence

### Redux Persist Configuration

```typescript
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cities', 'events'], // Only persist these slices
  blacklist: ['api'], // Don't persist API cache
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const persistor = persistStore(store)
```

## 🎮 State Management Patterns

### Optimistic Updates

```typescript
const [updateEvent] = useUpdateEventMutation()

const handleUpdate = async (updates) => {
  // Optimistic update
  const patchResult = dispatch(
    apiSlice.util.updateQueryData('getEventBySlug', slug, draft => {
      Object.assign(draft, updates)
    })
  )
  
  try {
    await updateEvent({ slug, updates }).unwrap()
  } catch {
    // Rollback on error
    patchResult.undo()
  }
}
```

### Normalized State

```typescript
import { createEntityAdapter } from '@reduxjs/toolkit'

// Entity adapter for normalized state
const eventsAdapter = createEntityAdapter<Event>({
  selectId: (event) => event.slug,
  sortComparer: (a, b) => a.date.localeCompare(b.date)
})

const eventSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState(),
  reducers: {
    setEvents: eventsAdapter.setAll,
    addEvent: eventsAdapter.addOne,
    updateEvent: eventsAdapter.updateOne,
    removeEvent: eventsAdapter.removeOne
  }
})

// Generated selectors
export const {
  selectAll: selectAllEvents,
  selectById: selectEventBySlug,
  selectIds: selectEventSlugs
} = eventsAdapter.getSelectors((state: RootState) => state.events)
```

## 🔍 Debugging

### Redux DevTools Integration

```typescript
// Automatic with configureStore
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})
```

### Action Logging

```typescript
// Custom middleware for logging
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('Previous State:', store.getState())
  console.log('Action:', action)
  const result = next(action)
  console.log('Next State:', store.getState())
  console.groupEnd()
  return result
}
```

## 🧪 Testing State

### Testing Slices

```typescript
describe('eventSlice', () => {
  it('should handle setSearchQuery', () => {
    const initialState = {
      searchQuery: '',
      events: [{ name: 'React Conference' }, { name: 'Vue Summit' }]
    }
    
    const newState = eventSlice.reducer(
      initialState,
      eventActions.setSearchQuery('react')
    )
    
    expect(newState.searchQuery).toBe('react')
    expect(newState.filteredEvents).toHaveLength(1)
  })
})
```

### Testing Async Thunks

```typescript
it('should fetch events', async () => {
  const store = configureStore({
    reducer: { events: eventSlice.reducer }
  })
  
  await store.dispatch(fetchEvents({ city: 'sf' }))
  
  const state = store.getState()
  expect(state.events.events).toHaveLength(10)
  expect(state.events.isLoading).toBe(false)
})
```

## 📊 Performance Optimization

### Selector Memoization

```typescript
// Expensive computation memoized
const selectEventStats = createSelector(
  [selectAllEvents],
  (events) => {
    // This only recalculates when events change
    return {
      total: events.length,
      avgPrice: events.reduce((sum, e) => sum + e.price, 0) / events.length,
      categories: [...new Set(events.map(e => e.category))]
    }
  }
)
```

### Batch Updates

```typescript
// Batch multiple updates
dispatch(batch(() => {
  dispatch(setEvents(events))
  dispatch(setCurrentPage(1))
  dispatch(clearFilters())
}))
```

---

For API integration details, see [API Reference](./API.md).