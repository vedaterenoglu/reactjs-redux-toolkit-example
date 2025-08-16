# 🤝 Contributing Guide

Welcome! We're excited that you're interested in contributing to the ReactJS Redux Toolkit Example project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## 🚀 Getting Started

### Prerequisites

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/reactjs-redux-toolkit-example.git
cd reactjs-redux-toolkit-example
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/vedaterenoglu/reactjs-redux-toolkit-example.git
```

4. Install dependencies:
```bash
npm install
```

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### 2. Make Changes

Follow our coding standards:

#### TypeScript Requirements

```typescript
// ✅ Good: Explicit types
interface EventProps {
  event: Event
  onSelect: (event: Event) => void
}

// ❌ Bad: Using 'any'
const handleEvent = (data: any) => {}
```

#### Component Structure

```typescript
// Follow this component structure
import { useState, useEffect } from 'react'        // React imports first
import { useAppSelector } from '@/store/hooks'     // Store imports
import { EventCard } from '@/components/events'    // Component imports
import type { Event } from '@/lib/types'           // Type imports last

export const EventList = () => {
  // Hooks first
  const [state, setState] = useState()
  const events = useAppSelector(selectEvents)
  
  // Event handlers
  const handleClick = () => {}
  
  // Effects
  useEffect(() => {}, [])
  
  // Render
  return <div>...</div>
}
```

### 3. Testing

Write tests for your changes:

```typescript
// Component test example
describe('EventCard', () => {
  it('should display event information', () => {
    const event = mockEvent()
    render(<EventCard event={event} />)
    
    expect(screen.getByText(event.name)).toBeInTheDocument()
    expect(screen.getByText(event.location)).toBeInTheDocument()
  })
})

// Hook test example
describe('useEventManagement', () => {
  it('should select event', () => {
    const { result } = renderHook(() => useEventManagement())
    
    act(() => {
      result.current.selectEvent(mockEvent())
    })
    
    expect(result.current.selectedEvent).toBeDefined()
  })
})
```

### 4. Code Quality Checks

Before committing, run:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Format code
npm run format

# Run all checks
npm run typecheck && npm run lint && npm run format:check
```

### 5. Commit Guidelines

Follow conventional commits:

```bash
# Format: <type>(<scope>): <subject>

# Examples:
git commit -m "feat(events): add event filtering by date"
git commit -m "fix(payment): correct Stripe redirect URL"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(store): simplify event slice logic"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Pull Request Guidelines

### PR Title

Follow the same format as commits:
```
feat(events): add advanced filtering options
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Test update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] No TypeScript errors
- [ ] No ESLint errors

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🏗️ Architecture Guidelines

### State Management

When adding new state:

```typescript
// 1. Create slice
const newFeatureSlice = createSlice({
  name: 'newFeature',
  initialState,
  reducers: {
    // Actions here
  }
})

// 2. Add to store
const store = configureStore({
  reducer: {
    newFeature: newFeatureSlice.reducer
  }
})

// 3. Create selectors
export const selectNewFeature = (state: RootState) => 
  state.newFeature

// 4. Create hooks if needed
export const useNewFeature = () => {
  const feature = useAppSelector(selectNewFeature)
  const dispatch = useAppDispatch()
  // Hook logic
}
```

### Component Creation

Follow these patterns:

```typescript
// 1. Create component file
// src/components/features/NewComponent.tsx

// 2. Add TypeScript interface
interface NewComponentProps {
  // Props definition
}

// 3. Implement component
export const NewComponent = ({ prop }: NewComponentProps) => {
  // Component logic
}

// 4. Add Storybook story
// src/components/features/NewComponent.stories.tsx
export default {
  title: 'Features/NewComponent',
  component: NewComponent
}

// 5. Export from index
// src/components/features/index.ts
export { NewComponent } from './NewComponent'
```

## 🎨 Styling Guidelines

### Tailwind CSS Usage

```tsx
// Use Tailwind utilities
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
  {/* Content */}
</div>

// Component variants with CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border border-primary"
      }
    }
  }
)
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## 📚 Documentation

Update documentation when:
- Adding new features
- Changing API interfaces
- Modifying configuration
- Adding new dependencies

```typescript
/**
 * EventCard - Displays event information in a card format
 * 
 * @param event - Event data to display
 * @param onSelect - Callback when event is selected
 * @returns Card component with event details
 * 
 * @example
 * <EventCard 
 *   event={eventData} 
 *   onSelect={(e) => console.log(e)}
 * />
 */
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to recreate the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node version
6. **Screenshots**: If applicable
7. **Error Messages**: Console errors or logs

## 💡 Feature Requests

For new features, provide:

1. **Use Case**: Why is this needed?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other approaches considered
4. **Additional Context**: Mockups, examples

## 🔍 Code Review Process

Reviewers will check:

1. **Functionality**: Does it work as intended?
2. **Code Quality**: Follows project standards?
3. **Tests**: Adequate test coverage?
4. **Documentation**: Updated as needed?
5. **Performance**: No performance regressions?
6. **Security**: No security vulnerabilities?

## 📋 Checklist for Contributors

Before submitting PR:

- [ ] Code compiles without warnings
- [ ] All tests pass
- [ ] TypeScript types are correct
- [ ] ESLint shows no errors
- [ ] Code is formatted with Prettier
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] PR description is complete

## 🎯 Priority Areas

Current areas needing contribution:

1. **Test Coverage**: Increase unit test coverage
2. **Documentation**: Improve inline documentation
3. **Performance**: Optimize bundle size
4. **Accessibility**: Enhance ARIA support
5. **i18n**: Add internationalization

## 📞 Getting Help

- Open an issue for bugs
- Start a discussion for questions
- Check existing issues first
- Join our Discord (if available)

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

Thank you for contributing! 🎉

---

Questions? Contact: info@vedaterenoglu.com