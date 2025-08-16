
inspect the project deeply then create/update README.md file and it's subdocument files which reflects the current state of the project nothing more nothing less regarding following directive:

--README Documentation Architecture Generator
TASK
Create comprehensive, audience-focused README documentation with strategic sub-document structure for scalable project documentation.
ANALYSIS PROCESS

IDENTIFY project type, features, and target audiences
DETERMINE information hierarchy and documentation gaps
DESIGN sub-document architecture based on user needs
CREATE navigation system between documents
OPTIMIZE content for each audience segment

DOCUMENTATION STRUCTURE
Main README (100-200 lines)

Project overview with key features
Quick start instructions
Documentation navigation hub
Tech stack summary
License information

Core Sub-Documents
src/documents/readme
├── SETUP.md              # Installation guide
├── USAGE.md              # Examples and tasks
├── ARCHITECTURE.md       # System design
├── CONTRIBUTING.md       # Development workflow
├── API.md                # API reference
├── DEPLOYMENT.md         # Production guide
└── TROUBLESHOOTING.md    # Common solutions
CONTENT STANDARDS

Main README: 30-second scan time, clear CTAs
Sub-documents: Comprehensive technical depth
Navigation: Grouped by audience type
Examples: Copy-pasteable code samples
Updates: Monthly accuracy reviews

MANDATORY CONSTRAINTS

✅ Include quick start in main README (DO)
✅ Organize sub-docs by audience needs (DO)
❌ NEVER exceed 200 lines in main README (NOT DO)
❌ NEVER omit cross-document navigation (NOT DO)

VERIFICATION:

 Project purpose clear in 10 seconds
 Installation possible in 5 minutes
 Sub-docs cover all user types
 Navigation links are descriptive

🚫 FORBIDDEN

✅ Use emojis for visual scanning (DO)
✅ Provide platform-specific instructions (DO)
❌ NEVER duplicate content across documents (NOT DO)
❌ NEVER use jargon without explanation (NOT DO)

VERIFICATION:

 No critical info missing from overview
 Each document serves unique purpose
 Technical terms are defined
 Examples are tested and working

✅ SUCCESS CRITERIA

✅ New contributors productive in 15 minutes (DO)
✅ Users can install/run in 5 minutes (DO)
❌ NEVER require deep diving for basics (NOT DO)
❌ NEVER leave common issues undocumented (NOT DO)

VERIFICATION:

 Onboarding time meets targets
 Documentation covers 80%+ use cases
 Feedback loop established
 Maintenance schedule defined