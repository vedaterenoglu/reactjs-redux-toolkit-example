# 🔌 API Reference

Complete API integration guide for the ReactJS Redux Toolkit Example application.

## API Overview

The application integrates with a RESTful API backend built with NestJS, using RTK Query for data fetching and caching.

### Base Configuration

```typescript
// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3060'

// RTK Query Base Configuration
const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json')
    return headers
  }
})
```

## 📡 RTK Query Endpoints

### Events API

#### Get Events List

```typescript
// Endpoint Definition
getEvents: builder.query<Event[], EventsQueryParams>({
  query: (params) => ({
    url: '/events',
    params: {
      limit: params.limit || 12,
      offset: params.offset || 0,
      sortBy: params.sortBy || 'date',
      order: params.order || 'asc',
      city: params.city,
      search: params.search
    }
  }),
  providesTags: ['EventList'],
  keepUnusedDataFor: 300 // 5 minutes
})

// Usage in Component
const { data, isLoading, error } = useGetEventsQuery({
  city: 'san-francisco',
  search: 'tech',
  limit: 12,
  offset: 0
})
```

#### Get Single Event

```typescript
// Endpoint Definition
getEventBySlug: builder.query<Event, string>({
  query: (slug) => `/events/${slug}`,
  providesTags: (result, error, slug) => [
    { type: 'Event', id: slug }
  ],
  keepUnusedDataFor: 600 // 10 minutes
})

// Usage
const { data: event } = useGetEventBySlugQuery('tech-conference-2024')
```

### Cities API

#### Get Cities List

```typescript
// Using traditional async thunk
export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (params: CityQueryParams) => {
    const response = await cityApiService.getCities(params)
    return response
  }
)

// Usage
dispatch(fetchCities({ search: 'san' }))
```

## 💳 Payment API

### Create Checkout Session

```typescript
// Service Implementation
export async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  const response = await fetch(getApiUrl('/payments/create-checkout-session'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      eventSlug: request.eventSlug,
      quantity: request.quantity,
      successUrl: request.successUrl,
      cancelUrl: request.cancelUrl
    })
  })
  
  const result = await response.json()
  return {
    checkoutUrl: result.checkoutUrl,
    sessionId: result.sessionId
  }
}
```

### Verify Payment Session

```typescript
// Verify payment after redirect
const verifyPayment = async (sessionId: string) => {
  const response = await fetch(
    getApiUrl(`/payments/verify-session/${sessionId}`)
  )
  return response.json()
}
```

## 🔄 Data Types

### Event Type

```typescript
interface Event {
  id: number
  slug: string
  name: string
  description: string
  date: string
  location: string
  city: string
  price: number
  capacity: number
  imageUrl?: string
  category: EventCategory
  tags: string[]
  organizer: {
    name: string
    email: string
  }
}
```

### API Response Types

```typescript
// Paginated Response
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

// Error Response
interface ApiError {
  statusCode: number
  message: string
  error?: string
  timestamp: string
}
```

## 🎯 API Patterns

### Optimistic Updates

```typescript
// Mutation with optimistic update
const [updateEvent] = useUpdateEventMutation()

const handleUpdate = async (updates) => {
  try {
    await updateEvent({
      slug: event.slug,
      updates
    }).unwrap()
  } catch (error) {
    // Rollback handled automatically by RTK Query
  }
}
```

### Cache Invalidation

```typescript
// Invalidate cache after mutation
createEvent: builder.mutation({
  query: (event) => ({
    url: '/api/admin/events',
    method: 'POST',
    body: event
  }),
  invalidatesTags: ['EventList']
})
```

### Polling & Refetching

```typescript
// Auto-refetch every 30 seconds
const { data } = useGetEventsQuery(params, {
  pollingInterval: 30000,
  refetchOnFocus: true,
  refetchOnReconnect: true
})

// Manual refetch
const { refetch } = useGetEventsQuery()
refetch()
```

## 🔐 Authentication

### Clerk Integration

```typescript
// Add auth token to requests
const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: async (headers) => {
    const token = await getToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})
```

## 🚨 Error Handling

### Global Error Handler

```typescript
// RTK Query error handling
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  
  if (result.error) {
    // Handle specific error codes
    if (result.error.status === 401) {
      // Redirect to login
    } else if (result.error.status === 403) {
      // Show permission denied
    }
  }
  
  return result
}
```

### Component Error Handling

```typescript
const { data, error, isLoading } = useGetEventsQuery()

if (error) {
  if ('status' in error) {
    return <ErrorState 
      code={error.status}
      message={error.data?.message || 'An error occurred'}
    />
  }
}
```

## 📊 Performance Optimization

### Request Deduplication

RTK Query automatically deduplicates identical requests:

```typescript
// These will result in only one API call
const Component1 = () => {
  const { data } = useGetEventsQuery({ city: 'sf' })
}

const Component2 = () => {
  const { data } = useGetEventsQuery({ city: 'sf' }) // Uses cached data
}
```

### Prefetching

```typescript
// Prefetch data before it's needed
const prefetchNextPage = () => {
  dispatch(
    apiSlice.util.prefetch('getEvents', {
      offset: currentOffset + limit
    })
  )
}
```

### Selective Caching

```typescript
// Different cache times for different data
getEvents: builder.query({
  query: (params) => ({ url: '/events', params }),
  keepUnusedDataFor: 60 // 1 minute for list
})

getEventBySlug: builder.query({
  query: (slug) => `/events/${slug}`,
  keepUnusedDataFor: 600 // 10 minutes for details
})
```

## 🧪 Testing API Calls

### Mock API Responses

```typescript
// Mock server setup
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
  rest.get('/api/events', (req, res, ctx) => {
    return res(ctx.json({ data: mockEvents }))
  })
)
```

### Testing Hooks

```typescript
import { renderHook, waitFor } from '@testing-library/react'

test('should fetch events', async () => {
  const { result } = renderHook(() => useGetEventsQuery())
  
  await waitFor(() => {
    expect(result.current.data).toBeDefined()
  })
})
```

## 📝 API Documentation

### Swagger/OpenAPI

The backend provides Swagger documentation at:
```
http://localhost:3060/api/docs
```

### Response Examples

#### Successful Response
```json
{
  "data": [
    {
      "id": 1,
      "slug": "tech-conference-2024",
      "name": "Tech Conference 2024",
      "price": 299.99,
      "date": "2024-06-15T09:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 12,
    "offset": 0
  }
}
```

#### Error Response
```json
{
  "statusCode": 404,
  "message": "Event not found",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

For state management details, see [State Management Guide](./STATE_MANAGEMENT.md).