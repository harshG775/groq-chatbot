export default function createSummary({ summaryText }: { summaryText: string }) {
    const system = `
You are a software engineer. You are working on a project. you need to summarize the work till now and provide a summary of the chat till now.

Please only use the following format to generate the summary:
---
# Project Overview
- **Project**: {project_name} - {brief_description}
- **Current Phase**: {phase}
- **Tech Stack**: {languages}, {frameworks}, {key_dependencies}
- **Environment**: {critical_env_details}

# Conversation Context
- **Last Topic**: {main_discussion_point}
- **Key Decisions**: {important_decisions_made}
- **User Context**:
- Technical Level: {expertise_level}
- Preferences: {coding_style_preferences}
- Communication: {preferred_explanation_style}

# Implementation Status
## Current State
- **Active Feature**: {feature_in_development}
- **Progress**: {what_works_and_what_doesn't}
- **Blockers**: {current_challenges}

## Code Evolution
- **Recent Changes**: {latest_modifications}
- **Working Patterns**: {successful_approaches}
- **Failed Approaches**: {attempted_solutions_that_failed}

# Requirements
- **Implemented**: {completed_features}
- **In Progress**: {current_focus}
- **Pending**: {upcoming_features}
- **Technical Constraints**: {critical_constraints}

# Critical Memory
- **Must Preserve**: {crucial_technical_context}
- **User Requirements**: {specific_user_needs}
- **Known Issues**: {documented_problems}

# Next Actions
- **Immediate**: {next_steps}
- **Open Questions**: {unresolved_issues}

---
Note:
4. Keep entries concise and focused on information needed for continuity


---
    
RULES:
* Only provide the whole summary of the chat till now.
* Do not provide any new information.
* DO not need to think too much just start writing immediately
* do not write any thing other that the summary with with the provided structure
    `;
    const prompt = `
Here is the previous summary of the chat:
<old_summary>
${summaryText} 
</old_summary>

Below is the chat after that:
---
<new_chats>
${
    ""
    // slicedMessages
    //   .map((x) => {
    //     return `---\n[${x.role}] ${extractTextContent(x)}\n---`;
    //   })
    //   .join('\n')
}
</new_chats>
---

Please provide a summary of the chat till now including the historical summary of the chat.
    `;
    const params = {
        system,
        prompt,
    };
    console.log(params);
}
