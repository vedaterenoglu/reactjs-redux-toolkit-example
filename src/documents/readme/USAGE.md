# 📖 Usage Guide

Learn how to use the key features of the ReactJS Redux Toolkit Example application.

## 🎯 Core Features

### Event Browsing

Navigate and explore events with advanced filtering:

```typescript
// Events are automatically loaded via RTK Query
const { data: events, isLoading } = useGetEventsQuery({
  city: selectedCity,
  search: searchTerm,
  limit: 12,
  offset: 0
})
```

**Features:**
- Auto-resizing grid layout
- Real-time search with debouncing
- City-based filtering
- Pagination with prefetching

### City Selection

Filter events by city:

1. Click "Select City" button
2. Browse available cities
3. Use search to find specific city
4. Click city card to filter events

```typescript
// City selection is managed via Redux
dispatch(selectCity(citySlug))
```

### Event Search

Real-time search with debouncing:

```typescript
// Search component with 300ms debounce
const debouncedSearch = useDebounce(searchTerm, 300)

// Applied to RTK Query
const { data } = useGetEventsQuery({ 
  search: debouncedSearch 
})
```

### Ticket Purchase

Complete payment flow with Stripe:

1. **Select Event** - Click on any event card
2. **Choose Quantity** - Select number of tickets
3. **Process Payment** - Secure Stripe checkout
4. **Confirmation** - Success page with details

```typescript
// Payment processing
const handlePurchase = async (quantity: number) => {
  const successUrl = getAppUrl(`/?payment=success&event=${slug}`)
  const cancelUrl = getAppUrl(`/?payment=cancel&event=${slug}`)
  
  const response = await processPayment({
    eventSlug: slug,
    quantity,
    successUrl,
    cancelUrl
  })
  
  window.location.href = response.checkoutUrl
}
```

## 🎨 UI Components

### Theme Switching

Toggle between light and dark themes:

```typescript
// Access theme from anywhere
const { theme, setTheme } = useTheme()

// Toggle theme
setTheme(theme === 'dark' ? 'light' : 'dark')
```

### Loading States

Comprehensive loading indicators:

```typescript
// RTK Query provides loading states
const { data, isLoading, error } = useGetEventsQuery()

if (isLoading) return <LoadingSpinner />
if (error) return <ErrorState />
```

### Empty States

User-friendly empty state messages:

```typescript
<EmptyState
  title="No events found"
  message="Try adjusting your filters"
  action={{ label: "Clear filters", onClick: clearFilters }}
/>
```

## 🏪 State Management

### Redux Toolkit Slices

Access and modify state:

```typescript
// Import typed hooks
import { useAppSelector, useAppDispatch } from '@/store/hooks'

// Read state
const events = useAppSelector(state => state.events.filteredEvents)
const selectedCity = useAppSelector(state => state.cities.selectedCity)

// Dispatch actions
const dispatch = useAppDispatch()
dispatch(setSearchQuery('conference'))
dispatch(selectCity('san-francisco'))
```

### RTK Query

Data fetching with caching:

```typescript
// Query hooks with automatic caching
const { data, refetch } = useGetEventsQuery(params)

// Mutations with optimistic updates
const [createEvent] = useCreateEventMutation()

// Manual cache updates
dispatch(
  apiSlice.util.updateQueryData('getEvents', {}, draft => {
    draft.push(newEvent)
  })
)
```

### Persistence

State persists across sessions:

```typescript
// Configured in store
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cities', 'events'] // Persisted slices
}
```

## 🔧 Developer Features

### Redux DevTools

Monitor state changes in real-time:

1. Install Redux DevTools Extension
2. Open DevTools (F12)
3. Navigate to Redux tab
4. Inspect state and actions

### Storybook Components

View component documentation:

```bash
npm run storybook
```

Available stories:
- CityCard
- EventCard
- LoadingSpinner
- ErrorState
- EmptyState
- SearchInput
- Pagination
- TestPaymentModal

### Test Payment Modal

Test payments without real transactions:

```typescript
// Enable test mode in development
<TestPaymentModal event={event} />
```

Test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🎯 Common Tasks

### Refresh Event Data

```typescript
// Manual refresh with RTK Query
const { refetch } = useGetEventsQuery()
refetch()
```

### Clear All Filters

```typescript
const clearFilters = () => {
  dispatch(clearCitySelection())
  dispatch(setSearchQuery(''))
  dispatch(resetPagination())
}
```

### Pagination

```typescript
// Navigate pages
const handlePageChange = (page: number) => {
  dispatch(setCurrentPage(page))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

### Error Recovery

```typescript
// Retry failed requests
const { error, refetch } = useGetEventsQuery()

if (error) {
  return (
    <ErrorState
      message="Failed to load events"
      onRetry={refetch}
    />
  )
}
```

## 🔍 Advanced Features

### Prefetching

Preload data for smooth navigation:

```typescript
// Prefetch next page
const prefetchNextPage = () => {
  dispatch(
    apiSlice.util.prefetch('getEvents', {
      offset: currentOffset + limit
    })
  )
}
```

### Optimistic Updates

Immediate UI updates:

```typescript
const [updateEvent] = useUpdateEventMutation()

// Optimistic update
const handleUpdate = async (updates) => {
  const result = await updateEvent({
    slug: event.slug,
    updates
  }).unwrap()
}
```

### Background Refetching

Keep data fresh:

```typescript
// Configure in RTK Query
useGetEventsQuery(params, {
  pollingInterval: 60000, // Refetch every minute
  refetchOnFocus: true,
  refetchOnReconnect: true
})
```

## 📱 Mobile Features

### Responsive Grid

Auto-adjusting layout:
- Desktop: 3-4 columns
- Tablet: 2 columns  
- Mobile: 1 column

### Touch Gestures

- Swipe to navigate
- Pull to refresh
- Tap to select

### Mobile Navigation

Optimized for thumb reach:
- Bottom navigation
- Floating action buttons
- Accessible controls

## 🎨 Customization

### Theme Customization

Modify theme colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: 'your-color',
      secondary: 'your-color'
    }
  }
}
```

### Component Styling

Use Tailwind utilities:

```tsx
<Card className="hover:shadow-lg transition-shadow">
  {/* Content */}
</Card>
```

## 🚀 Performance Tips

1. **Use Memoization** - Wrap expensive components with `React.memo`
2. **Lazy Load Routes** - Split code at route level
3. **Optimize Images** - Use WebP format and lazy loading
4. **Cache API Calls** - Leverage RTK Query caching
5. **Debounce Input** - Prevent excessive API calls

---

Need more help? Check our [Troubleshooting Guide](./TROUBLESHOOTING.md) or [open an issue](https://github.com/vedaterenoglu/reactjs-redux-toolkit-example/issues).