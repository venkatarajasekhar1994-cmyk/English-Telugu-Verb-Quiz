const diagram_data = {
  "nodes":,
  "edges": [
    { "id": "e_i_base", "source": "p_i", "target": "v_base" },
    { "id": "e_we_base", "source": "p_we", "target": "v_base" },
    { "id": "e_you_base", "source": "p_you", "target": "v_base" },
    { "id": "e_they_base", "source": "p_they", "target": "v_base" },
    { "id": "e_he_base_s", "source": "p_he", "target": "v_base_s_es" },
    { "id": "e_she_base_s", "source": "p_she", "target": "v_base_s_es" },
    { "id": "e_it_base_s", "source": "p_it", "target": "v_base_s_es" },
    { "id": "e_i_do", "source": "p_i", "target": "hv_do" },
    { "id": "e_we_do", "source": "p_we", "target": "hv_do" },
    { "id": "e_you_do", "source": "p_you", "target": "hv_do" },
    { "id": "e_they_do", "source": "p_they", "target": "hv_do" },
    { "id": "e_he_does", "source": "p_he", "target": "hv_does" },
    { "id": "e_she_does", "source": "p_she", "target": "hv_does" },
    { "id": "e_it_does", "source": "p_it", "target": "hv_does" },
    { "id": "e_do_base", "source": "hv_do", "target": "v_base" },
    { "id": "e_does_base", "source": "hv_does", "target": "v_base" },
    { "id": "e_q_do", "source_type": "question-word", "target": "hv_do" },
    { "id": "e_q_does", "source_type": "question-word", "target": "hv_does" },
    { "id": "e_i_past", "source": "p_i", "target": "v_past" },
    { "id": "e_we_past", "source": "p_we", "target": "v_past" },
    { "id": "e_you_past", "source": "p_you", "target": "v_past" },
    { "id": "e_they_past", "source": "p_they", "target": "v_past" },
    { "id": "e_he_past", "source": "p_he", "target": "v_past" },
    { "id": "e_she_past", "source": "p_she", "target": "v_past" },
    { "id": "e_it_past", "source": "p_it", "target": "v_past" },
    { "id": "e_all_pronouns_did", "source_type": "pronoun", "target": "hv_did" },
    { "id": "e_did_base", "source": "hv_did", "target": "v_base" },
    { "id": "e_q_did", "source_type": "question-word", "target": "hv_did" },
    { "id": "e_did_all_pronouns", "source": "hv_did", "target_type": "pronoun" },
    { "id": "e_all_pronouns_base_q", "source_type": "pronoun", "target": "v_base" },
    { "id": "e_i_shall", "source": "p_i", "target": "hv_shall" },
    { "id": "e_we_shall", "source": "p_we", "target": "hv_shall" },
    { "id": "e_you_will", "source": "p_you", "target": "hv_will" },
    { "id": "e_they_will", "source": "p_they", "target": "hv_will" },
    { "id": "e_he_will", "source": "p_he", "target": "hv_will" },
    { "id": "e_she_will", "source": "p_she", "target": "hv_will" },
    { "id": "e_it_will", "source": "p_it", "target": "hv_will" },
    { "id": "e_shall_base", "source": "hv_shall", "target": "v_base" },
    { "id": "e_will_base", "source": "hv_will", "target": "v_base" },
    { "id": "e_q_shall", "source_type": "question-word", "target": "hv_shall" },
    { "id": "e_q_will", "source_type": "question-word", "target": "hv_will" },
    { "id": "e_shall_iw", "source": "hv_shall", "target_group": ["p_i", "p_we"] },
    { "id": "e_will_others", "source": "hv_will", "target_group": ["p_you", "p_they", "p_he", "p_she", "p_it"] },
    { "id": "e_i_am", "source": "p_i", "target": "hv_am" },
    { "id": "e_we_are", "source": "p_we", "target": "hv_are" },
    { "id": "e_you_are", "source": "p_you", "target": "hv_are" },
    { "id": "e_they_are", "source": "p_they", "target": "hv_are" },
    { "id": "e_he_is", "source": "p_he", "target": "hv_is" },
    { "id": "e_she_is", "source": "p_she", "target": "hv_is" },
    { "id": "e_it_is", "source": "p_it", "target": "hv_is" },
    { "id": "e_am_ing", "source": "hv_am", "target": "v_ing" },
    { "id": "e_is_ing", "source": "hv_is", "target": "v_ing" },
    { "id": "e_are_ing", "source": "hv_are", "target": "v_ing" },
    { "id": "e_i_was", "source": "p_i", "target": "hv_was" },
    { "id": "e_he_was", "source": "p_he", "target": "hv_was" },
    { "id": "e_she_was", "source": "p_she", "target": "hv_was" },
    { "id": "e_it_was", "source": "p_it", "target": "hv_was" },
    { "id": "e_we_were", "source": "p_we", "target": "hv_were" },
    { "id": "e_you_were", "source": "p_you", "target": "hv_were" },
    { "id": "e_they_were", "source": "p_they", "target": "hv_were" },
    { "id": "e_was_ing", "source": "hv_was", "target": "v_ing" },
    { "id": "e_were_ing", "source": "hv_were", "target": "v_ing" },
    { "id": "e_i_shall_be", "source": "p_i", "target": "hv_shall_be" },
    { "id": "e_we_shall_be", "source": "p_we", "target": "hv_shall_be" },
    { "id": "e_you_will_be", "source": "p_you", "target": "hv_will_be" },
    { "id": "e_they_will_be", "source": "p_they", "target": "hv_will_be" },
    { "id": "e_he_will_be", "source": "p_he", "target": "hv_will_be" },
    { "id": "e_she_will_be", "source": "p_she", "target": "hv_will_be" },
    { "id": "e_it_will_be", "source": "p_it", "target": "hv_will_be" },
    { "id": "e_shall_be_ing", "source": "hv_shall_be", "target": "v_ing" },
    { "id": "e_will_be_ing", "source": "hv_will_be", "target": "v_ing" },
    { "id": "e_all_pronouns_can", "source_type": "pronoun", "target": "hv_can" },
    { "id": "e_can_base", "source": "hv_can", "target": "v_base" },
    { "id": "e_all_pronouns_could", "source_type": "pronoun", "target": "hv_could" },
    { "id": "e_could_base", "source": "hv_could", "target": "v_base" },
    { "id": "e_all_pronouns_may", "source_type": "pronoun", "target": "hv_may" },
    { "id": "e_all_pronouns_might", "source_type": "pronoun", "target": "hv_might" },
    { "id": "e_may_base", "source": "hv_may", "target": "v_base" },
    { "id": "e_might_base", "source": "hv_might", "target": "v_base" },
    { "id": "e_all_pronouns_should", "source_type": "pronoun", "target": "hv_should" },
    { "id": "e_should_base", "source": "hv_should", "target": "v_base" },
    { "id": "e_all_pronouns_must", "source_type": "pronoun", "target": "hv_must" },
    { "id": "e_must_base", "source": "hv_must", "target": "v_base" },
    { "id": "e_all_pronouns_would", "source_type": "pronoun", "target": "hv_would" },
    { "id": "e_would_base", "source": "hv_would", "target": "v_base" },
    { "id": "e_group1_have", "source_group": ["p_i", "p_we", "p_you", "p_they"], "target": "hv_have" },
    { "id": "e_group2_has", "source_group": ["p_he", "p_she", "p_it"], "target": "hv_has" },
    { "id": "e_have_noun", "source": "hv_have", "target": "v_noun" },
    { "id": "e_has_noun", "source": "hv_has", "target": "v_noun" },
    { "id": "e_have_ppf", "source": "hv_have", "target": "v_ppf" },
    { "id": "e_has_ppf", "source": "hv_has", "target": "v_ppf" },
    { "id": "e_all_pronouns_had", "source_type": "pronoun", "target": "hv_had" },
    { "id": "e_had_ppf", "source": "hv_had", "target": "v_ppf" },
    { "id": "e_i_shall_have", "source": "p_i", "target": "hv_shall_have" },
    { "id": "e_we_shall_have", "source": "p_we", "target": "hv_shall_have" },
    { "id": "e_others_will_have", "source_group": ["p_you", "p_they", "p_he", "p_she", "p_it"], "target": "hv_will_have" },
    { "id": "e_shall_have_ppf", "source": "hv_shall_have", "target": "v_ppf" },
    { "id": "e_will_have_ppf", "source": "hv_will_have", "target": "v_ppf" },
    { "id": "e_all_pronouns_should_have", "source_type": "pronoun", "target": "hv_should_have" },
    { "id": "e_all_pronouns_must_have", "source_type": "pronoun", "target": "hv_must_have" },
    { "id": "e_should_have_ppf", "source": "hv_should_have", "target": "v_ppf" },
    { "id": "e_must_have_ppf", "source": "hv_must_have", "target": "v_ppf" },
    { "id": "e_all_pronouns_may_have", "source_type": "pronoun", "target": "hv_may_have" },
    { "id": "e_all_pronouns_might_have", "source_type": "pronoun", "target": "hv_might_have" },
    { "id": "e_may_have_ppf", "source": "hv_may_have", "target": "v_ppf" },
    { "id": "e_might_have_ppf", "source": "hv_might_have", "target": "v_ppf" },
    { "id": "e_all_pronouns_would_have", "source_type": "pronoun", "target": "hv_would_have" },
    { "id": "e_all_pronouns_could_have", "source_type": "pronoun", "target": "hv_could_have" },
    { "id": "e_would_have_ppf", "source": "hv_would_have", "target": "v_ppf" },
    { "id": "e_could_have_ppf", "source": "hv_could_have", "target": "v_ppf" },
    { "id": "e_group1_have_been", "source_group": ["p_i", "p_we", "p_you", "p_they"], "target": "hv_have_been" },
    { "id": "e_group2_has_been", "source_group": ["p_he", "p_she", "p_it"], "target": "hv_has_been" },
    { "id": "e_have_been_ing", "source": "hv_have_been", "target": "v_ing" },
    { "id": "e_has_been_ing", "source": "hv_has_been", "target": "v_ing" },
    { "id": "e_all_pronouns_had_been", "source_type": "pronoun", "target": "hv_had_been" },
    { "id": "e_had_been_ing", "source": "hv_had_been", "target": "v_ing" },
    { "id": "e_group1_shall_have_been", "source_group": ["p_i", "p_we"], "target": "hv_shall_have_been" },
    { "id": "e_group2_will_have_been", "source_group": ["p_you", "p_they", "p_he", "p_she", "p_it"], "target": "hv_will_have_been" },
    { "id": "e_shall_have_been_ing", "source": "hv_shall_have_been", "target": "v_ing" },
    { "id": "e_will_have_been_ing", "source": "hv_will_have_been", "target": "v_ing" },
    { "id": "e_all_pronouns_should_have_been", "source_type": "pronoun", "target": "hv_should_have_been" },
    { "id": "e_should_have_been_ing", "source": "hv_should_have_been", "target": "v_ing" },
    { "id": "e_all_pronouns_must_have_been", "source_type": "pronoun", "target": "hv_must_have_been" },
    { "id": "e_must_have_been_ing", "source": "hv_must_have_been", "target": "v_ing" },
    { "id": "e_all_pronouns_would_have_been", "source_type": "pronoun", "target": "hv_would_have_been" },
    { "id": "e_would_have_been_ing", "source": "hv_would_have_been", "target": "v_ing" },
    { "id": "e_all_pronouns_could_have_been", "source_type": "pronoun", "target": "hv_could_have_been" },
    { "id": "e_could_have_been_ing", "source": "hv_could_have_been", "target": "v_ing" },
    { "id": "e_all_pronouns_may_have_been", "source_type": "pronoun", "target": "hv_may_have_been" },
    { "id": "e_may_have_been_ing", "source": "hv_may_have_been", "target": "v_ing" },
    { "id": "e_all_pronouns_might_have_been", "source_type": "pronoun", "target": "hv_might_have_been" },
    { "id": "e_might_have_been_ing", "source": "hv_might_have_been", "target": "v_ing" },
    { "id": "e_group1_have_to", "source_group": ["p_i", "p_we", "p_you", "p_they"], "target": "hv_have_to" },
    { "id": "e_group2_has_to", "source_group": ["p_he", "p_she", "p_it"], "target": "hv_has_to" },
    { "id": "e_have_to_base", "source": "hv_have_to", "target": "v_base" },
    { "id": "e_has_to_base", "source": "hv_has_to", "target": "v_base" },
    { "id": "e_group1_shall_have_to", "source_group": ["p_i", "p_we"], "target": "hv_shall_have_to" },
    { "id": "e_group2_will_have_to", "source_group": ["p_you", "p_they", "p_he", "p_she", "p_it"], "target": "hv_will_have_to" },
    { "id": "e_shall_have_to_base", "source": "hv_shall_have_to", "target": "v_base" },
    { "id": "e_will_have_to_base", "source": "hv_will_have_to", "target": "v_base" },
    { "id": "e_group1_dare_to", "source_group": ["p_i", "p_we", "p_you", "p_they"], "target": "hv_dare_to" },
    { "id": "e_group2_dares_to", "source_group": ["p_he", "p_she", "p_it"], "target": "hv_dares_to" },
    { "id": "e_dare_to_base", "source": "hv_dare_to", "target": "v_base" },
    { "id": "e_dares_to_base", "source": "hv_dares_to", "target": "v_base" },
    { "id": "e_all_pronouns_ought_to", "source_type": "pronoun", "target": "hv_ought_to" },
    { "id": "e_ought_to_base", "source": "hv_ought_to", "target": "v_base" },
    { "id": "e_group1_need_to", "source_group": ["p_i", "p_we", "p_you", "p_they"], "target": "hv_need_to" },
    { "id": "e_group2_needs_to", "source_group": ["p_he", "p_she", "p_it"], "target": "hv_needs_to" },
    { "id": "e_need_to_base", "source": "hv_need_to", "target": "v_base" },
    { "id": "e_needs_to_base", "source": "hv_needs_to", "target": "v_base" },
    { "id": "e_group1_want_to", "source_group": ["p_i", "p_we", "p_you", "p_they"], "target": "hv_want_to" },
    { "id": "e_group2_wants_to", "source_group": ["p_he", "p_she", "p_it"], "target": "hv_wants_to" },
    { "id": "e_want_to_base", "source": "hv_want_to", "target": "v_base" },
    { "id": "e_wants_to_base", "source": "hv_wants_to", "target": "v_base" },
    { "id": "e_group1_wish_to", "source_group": ["p_i", "p_we", "p_you", "p_they"], "target": "hv_wish_to" },
    { "id": "e_group2_wishes_to", "source_group": ["p_he", "p_she", "p_it"], "target": "hv_wishes_to" },
    { "id": "e_wish_to_base", "source": "hv_wish_to", "target": "v_base" },
    { "id": "e_wishes_to_base", "source": "hv_wishes_to", "target": "v_base" },
    { "id": "e_all_pronouns_would_like_to", "source_type": "pronoun", "target": "hv_would_like_to" },
    { "id": "e_would_like_to_base", "source": "hv_would_like_to", "target": "v_base" },
    { "id": "e_all_pronouns_wanted_to", "source_type": "pronoun", "target": "hv_wanted_to" },
    { "id": "e_wanted_to_base", "source": "hv_wanted_to", "target": "v_base" },
    { "id": "e_all_pronouns_had_to", "source_type": "pronoun", "target": "hv_had_to" },
    { "id": "e_had_to_base", "source": "hv_had_to", "target": "v_base" },
    { "id": "e_all_pronouns_used_to", "source_type": "pronoun", "target": "hv_used_to" },
    { "id": "e_used_to_base", "source": "hv_used_to", "target": "v_base" }
  ],
  "diagrams": {
    "class-01": {
      "title": "Class - 01: PRONOUNS",
      "layout": "s-v-o-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "po_me", "po_us", "po_you", "po_them", "po_him", "po_her", "po_it"],
      "edgeIds":,
      "additionalData": {
        "table": [
          { "subject": "p_i", "object": "po_me" },
          { "subject": "p_we", "object": "po_us" },
          { "subject": "p_you", "object": "po_you" },
          { "subject": "p_they", "object": "po_them" },
          { "subject": "p_he", "object": "po_him" },
          { "subject": "p_she", "object": "po_her" },
          { "subject": "p_it", "object": "po_it" }
        ]
      }
    },
    "class-05": {
      "title": "Class - 05: Habitual actions/Daily routines",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "v_base", "v_base_s_es"],
      "edgeIds": ["e_i_base", "e_we_base", "e_you_base", "e_they_base", "e_he_base_s", "e_she_base_s", "e_it_base_s"],
      "additionalData": {
        "use": "To express a habitual action",
        "telugu_meaning": "అలవాటుగా చేసే పనిని తెలియజేయునప్పుడు",
        "key_words": ["every", "daily", "regularly", "usually", "mostly", "often", "sometimes", "always", "rarely", "seldom", "hardly", "never"]
      }
    },
    "class-06": {
      "title": "Class - 06: Do/Does",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_do", "hv_does", "v_base"],
      "edgeIds": ["e_i_do", "e_we_do", "e_you_do", "e_they_do", "e_he_does", "e_she_does", "e_it_does", "e_do_base", "e_does_base"],
      "additionalData": {
        "use": "To express an action that happens as a habit",
        "telugu_meaning": "అలవాటుగా చేసే పనిని తెలియజేయునప్పుడు",
        "key_words": ["every", "daily", "regularly", "usually", "mostly", "often", "sometimes", "always", "rarely", "seldom", "hardly", "never"],
        "negative_contractions": [
          { "form": "do + not = don't", "te": "చేయను/చేయము" },
          { "form": "does + not = doesn't", "te": "చేయడు/చేయదు" }
        ]
      }
    },
    "class-07": {
      "title": "Class - 07: QUESTION TABLE – DO & DOES",
      "layout": "question-table",
      "nodeIds": ["q_what", "q_why", "q_where", "q_when", "q_which", "q_whose", "q_whom", "q_how", "q_who", "hv_do", "hv_does", "p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "v_base"],
      "edgeIds": ["e_q_do", "e_q_does", "e_i_do", "e_we_do", "e_you_do", "e_they_do", "e_he_does", "e_she_does", "e_it_does", "e_i_base", "e_we_base", "e_you_base", "e_they_base", "e_he_base_s", "e_she_base_s", "e_it_base_s"]
    },
    "class-08": {
      "title": "Class - 08: Verb in the past form",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "v_past"],
      "edgeIds": ["e_i_past", "e_we_past", "e_you_past", "e_they_past", "e_he_past", "e_she_past", "e_it_past"],
      "additionalData": {
        "use": "To express an action that happened at some time in the past",
        "telugu_meaning": "గతంలో చేసిన పనిని తెలుపుతున్నప్పుడు",
        "key_words":
      }
    },
    "class-09": {
      "title": "Class - 09: Did + Verb in (V1 form)",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_did", "v_base"],
      "edgeIds": ["e_all_pronouns_did", "e_did_base"],
      "additionalData": {
        "use": "To express an action that happened at some time in the past",
        "telugu_meaning": "గతంలో చేసిన పనిని తెలిపినప్పుడు",
        "key_words":,
        "negative_contractions": [
          { "form": "did + not = didn't", "te": "చేయలేదు" }
        ]
      }
    },
    "class-10": {
      "title": "Class - 10: QUESTION TABLE – Did",
      "layout": "question-table",
      "nodeIds": ["q_what", "q_why", "q_where", "q_when", "q_which", "q_whose", "q_whom", "q_how", "q_who", "hv_did", "p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "v_base"],
      "edgeIds": ["e_q_did", "e_did_all_pronouns", "e_all_pronouns_base_q"]
    },
    "class-11": {
      "title": "Class - 11: Shall/ Will",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_shall", "hv_will", "v_base"],
      "edgeIds": ["e_i_shall", "e_we_shall", "e_you_will", "e_they_will", "e_he_will", "e_she_will", "e_it_will", "e_shall_base", "e_will_base"],
      "additionalData": {
        "use": "To express an action that will happen in future",
        "telugu_meaning": "భవిష్యత్తులో చేయబోయే పనిని తెలుపుతున్నప్పుడు",
        "key_words":,
        "negative_contractions":
      }
    },
    "class-12": {
      "title": "Class - 12: QUESTION TABLE – Shall/Will",
      "layout": "question-table",
      "nodeIds": ["q_what", "q_why", "q_where", "q_when", "q_which", "q_whose", "q_whom", "q_how", "q_who", "hv_shall", "hv_will", "p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "v_base"],
      "edgeIds": ["e_q_shall", "e_q_will", "e_shall_iw", "e_will_others", "e_all_pronouns_base_q"]
    },
    "class-13": {
      "title": "Class - 13: PRESENT “BE” FORMS - am/is/are",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_am", "hv_is", "hv_are", "v_ing"],
      "edgeIds": ["e_i_am", "e_we_are", "e_you_are", "e_they_are", "e_he_is", "e_she_is", "e_it_is", "e_am_ing", "e_is_ing", "e_are_ing"],
      "additionalData": {
        "use": "To express an action that is happening at present",
        "telugu_meaning": "ప్రస్తుతం జరుగుతూ ఉన్న పనిని తెలియజేయునప్పుడు",
        "key_words":,
        "negative_contractions": [
          { "form": "am + not = am not" },
          { "form": "is + not = isn't" },
          { "form": "are + not = aren't" }
        ]
      }
    },
    "class-14": {
      "title": "Class - 14: PAST “BE” FORMS - was/were",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_was", "hv_were", "v_ing"],
      "edgeIds": ["e_i_was", "e_he_was", "e_she_was", "e_it_was", "e_we_were", "e_you_were", "e_they_were", "e_was_ing", "e_were_ing"],
      "additionalData": {
        "use": "To express an action that was happening at some time in the past",
        "telugu_meaning": "గతంలో జరుగుతూ ఉన్న పనిని తెలిపినప్పుడు",
        "key_words":,
        "negative_contractions": [
          { "form": "was + not = wasn't" },
          { "form": "were + not = weren't" }
        ]
      }
    },
    "class-15": {
      "title": "Class - 15: FUTURE “BE” FORMS - Shall be/ Will be",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_shall_be", "hv_will_be", "v_ing"],
      "edgeIds": ["e_i_shall_be", "e_we_shall_be", "e_you_will_be", "e_they_will_be", "e_he_will_be", "e_she_will_be", "e_it_will_be", "e_shall_be_ing", "e_will_be_ing"],
      "additionalData": {
        "use": "To express an action that will be happening at some time in the future",
        "telugu_meaning": "భవిష్యత్తులో ఒక పని జరుగుతూ ఉండిన పనిని తెలిపినప్పుడు",
        "key_words": ["tomorrow", "at", "next week", "next month", "next year", "after two years", "after two months", "after two days"],
        "negative_contractions": [
          { "form": "shall + not = shan't be" },
          { "form": "will + not = won't be" }
        ]
      }
    },
    "class-16": {
      "title": "Class - 16: Can / Could",
      "layout": "modal-verb-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_can", "hv_could", "v_base"],
      "edgeIds": ["e_all_pronouns_can", "e_can_base", "e_all_pronouns_could", "e_could_base"],
      "additionalData": {
        "can": {
          "use": "To express the present ability of a doer",
          "telugu_meaning": "‘చేయగలను’ అని ప్రస్తుత సామర్థ్యాన్ని తెలిపినప్పుడు",
          "other_uses":
        },
        "could": {
          "use": "To express the past ability of a doer",
          "telugu_meaning": "‘చేయగలిగాను’ అని గత సామర్థ్యాన్ని తెలిపినప్పుడు",
          "other_uses":
        }
      }
    },
    "class-17": {
      "title": "Class - 17: May / Might",
      "layout": "modal-verb-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_may", "hv_might", "v_base"],
      "edgeIds": ["e_all_pronouns_may", "e_all_pronouns_might", "e_may_base", "e_might_base"],
      "additionalData": {
        "use": "To express the uncertainty of an action/situation",
        "telugu_meaning": "ఏదైనా ఒక పని జరిగితే జరగవచ్చు / చేస్తే చేయవచ్చు అని తెలిపినప్పుడు",
        "other_uses":
      }
    },
    "class-18": {
      "title": "Class - 18: Should",
      "layout": "modal-verb-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_should", "v_base"],
      "edgeIds": ["e_all_pronouns_should", "e_should_base"],
      "additionalData": {
        "use": "To express the responsibility of a doer",
        "telugu_meaning": "ఏదైనా ఒక పని చేయాలి/బాధ్యతతో చేయాలి అని తెలిపినప్పుడు",
        "other_uses":
      }
    },
    "class-19": {
      "title": "Class - 19: Must",
      "layout": "modal-verb-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_must", "v_base"],
      "edgeIds": ["e_all_pronouns_must", "e_must_base"],
      "additionalData": {
        "use": "To express the obligation of a doer",
        "telugu_meaning": "ఏదైనా ఒక పనిని తప్పకుండా చేయాలి అని తెలిపినప్పుడు",
        "other_uses":
      }
    },
    "class-20": {
      "title": "Class - 20: Would",
      "layout": "modal-verb-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_would", "v_base"],
      "edgeIds": ["e_all_pronouns_would", "e_would_base"],
      "additionalData": {
        "use": "To express past repeated actions of a doer",
        "telugu_meaning": "ఒకప్పుడు అలవాటుగా చేసిన పనుల గురించి తెలిపినప్పుడు",
        "other_uses":
      }
    },
    "class-21": {
      "title": "Class - 21: Have / Has",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_have", "hv_has", "v_noun"],
      "edgeIds": ["e_group1_have", "e_group2_has", "e_have_noun", "e_has_noun"],
      "additionalData": {
        "use": "To express something about present possession",
        "telugu_meaning": "ఏదైనా కలిగి ఉన్నాను అని తెలిపినప్పుడు"
      }
    },
    "class-22": {
      "title": "Class - 22: Have / Has (Recent Past Actions)",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_have", "hv_has", "v_ppf"],
      "edgeIds": ["e_group1_have", "e_group2_has", "e_have_ppf", "e_has_ppf"],
      "additionalData": {
        "use": "To express an action that happened in the recent past",
        "telugu_meaning": "ఈ మధ్య కాలంలో జరిగిన పనిని తెలిపినప్పుడు",
        "key_words":,
        "negative_contractions": [
          { "form": "have + not = haven't" },
          { "form": "has + not = hasn't" }
        ]
      }
    },
    "class-23": {
      "title": "Class - 23: Had (Two Past Actions)",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_had", "v_ppf"],
      "edgeIds": ["e_all_pronouns_had", "e_had_ppf"],
      "additionalData": {
        "use": "To express an action that happened before another action in the past",
        "telugu_meaning": "గతంలో ఒక పనిని చేయడానికి ముందే మరొక పనిని తెలిపినప్పుడు",
        "key_words":,
        "negative_contractions": [
          { "form": "had + not = hadn't" }
        ]
      }
    },
    "class-24": {
      "title": "Class - 24: Shall have / Will have (Past Actions in future)",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_shall_have", "hv_will_have", "v_ppf"],
      "edgeIds": ["e_i_shall_have", "e_we_shall_have", "e_others_will_have", "e_shall_have_ppf", "e_will_have_ppf"],
      "additionalData": {
        "use": "To express an action that will already have happened at some time in the future",
        "telugu_meaning": "భవిష్యత్తులో ఒకానొక సమయానికి జరిగి ఉండే పనిని తెలిపినప్పుడు",
        "key_words":,
        "negative_contractions": [
          { "form": "shall + not + have = shan't have" },
          { "form": "will + not + have = won't have" }
        ]
      }
    },
    "class-25": {
      "title": "Class - 25: Should have / Must have (Past Unfulfilled Actions)",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_should_have", "hv_must_have", "v_ppf"],
      "edgeIds": ["e_all_pronouns_should_have", "e_all_pronouns_must_have", "e_should_have_ppf", "e_must_have_ppf"],
      "additionalData": {
        "telugu_meaning_should": "చేసి ఉండాల్సింది",
        "telugu_meaning_must": "తప్పకుండా చేసి ఉండాల్సింది",
        "negative_contractions": [
          { "form": "should + not + have = shouldn't have" },
          { "form": "must + not + have = mustn't have" }
        ]
      }
    },
    "class-26": {
      "title": "Class - 26: May have / Might have (Uncertain Actions in Past)",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_may_have", "hv_might_have", "v_ppf"],
      "edgeIds": ["e_all_pronouns_may_have", "e_all_pronouns_might_have", "e_may_have_ppf", "e_might_have_ppf"],
      "additionalData": {
        "telugu_meaning": "చేసి ఉండొచ్చు",
        "negative_contractions": [
          { "form": "May + not + have = mayn't have" },
          { "form": "might + not + have = mightn't have" }
        ]
      }
    },
    "class-27": {
      "title": "Class - 27: Would have / Could have",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_would_have", "hv_could_have", "v_ppf"],
      "edgeIds": ["e_all_pronouns_would_have", "e_all_pronouns_could_have", "e_would_have_ppf", "e_could_have_ppf"],
      "additionalData": {
        "telugu_meaning_would": "చేసి ఉండేవాడిని",
        "telugu_meaning_could": "చేయగలిగి ఉండేవాడిని",
        "negative_contractions": [
          { "form": "would + not + have = wouldn't have" },
          { "form": "could + not + have = couldn't have" }
        ]
      }
    },
    "class-29": {
      "title": "Class - 29: Have been / Has been",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_have_been", "hv_has_been", "v_ing"],
      "edgeIds": ["e_group1_have_been", "e_group2_has_been", "e_have_been_ing", "e_has_been_ing"],
      "additionalData": {
        "use": "To express an action that began in the past and is still happening",
        "telugu_meaning": "గతంలో ప్రారంభించి ప్రస్తుతం కూడా చేస్తూనే ఉన్న పనిని తెలిపినప్పుడు",
        "key_words": ["for", "since", "how long", "the whole", "lately"],
        "negative_contractions": [
          { "form": "have + not + been = haven't been" },
          { "form": "has + not + been = hasn't been" }
        ]
      }
    },
    "class-30": {
      "title": "Class - 30: Had been",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_had_been", "v_ing"],
      "edgeIds": ["e_all_pronouns_had_been", "e_had_been_ing"],
      "additionalData": {
        "use": "To express an action that had been happening before something else happened",
        "telugu_meaning": "గతంలో ఒక పనిని చేయడానికి ముందు వరకు చేస్తూనే ఉన్న పనిని తెలిపినప్పుడు",
        "key_words": ["till", "until", "up to", "before", "previously", "earlier"],
        "negative_contractions": [
          { "form": "had + not + been = hadn't been" }
        ]
      }
    },
    "class-31": {
      "title": "Class - 31: Shall have been / Will have been",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_shall_have_been", "hv_will_have_been", "v_ing"],
      "edgeIds": ["e_group1_shall_have_been", "e_group2_will_have_been", "e_shall_have_been_ing", "e_will_have_been_ing"],
      "additionalData": {
        "use": "To express an action that will be there in progress before another action in the future",
        "telugu_meaning": "భవిష్యత్తులో కొంత కాలం తరువాత కూడా జరుగుతూనే ఉండే పనిని తెలుపుతున్నప్పుడు",
        "key_words":,
        "negative_contractions": [
          { "form": "shall + not + have + been = shan't have been" },
          { "form": "will + not + have + been = won't have been" }
        ]
      }
    },
    "class-33": {
      "title": "Class - 33: Should have been / Must have been",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_should_have_been", "hv_must_have_been", "v_ing"],
      "edgeIds": ["e_all_pronouns_should_have_been", "e_should_have_been_ing", "e_all_pronouns_must_have_been", "e_must_have_been_ing"],
      "additionalData": {
        "telugu_meaning_should": "ఒక పని చేస్తూ ఉండి ఉండాల్సింది",
        "telugu_meaning_must": "ఒక పని తప్పకుండా చేస్తూ ఉండి ఉండాల్సింది"
      }
    },
    "class-34": {
      "title": "Class - 34: Would have been / Could have been",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_would_have_been", "hv_could_have_been", "v_ing"],
      "edgeIds": ["e_all_pronouns_would_have_been", "e_would_have_been_ing", "e_all_pronouns_could_have_been", "e_could_have_been_ing"],
      "additionalData": {
        "telugu_meaning_would": "ఒక పని చేస్తూ ఉండి ఉండేవాడిని",
        "telugu_meaning_could": "ఒక పని చేస్తూ ఉండి ఉండగలిగేవాడిని"
      }
    },
    "class-35": {
      "title": "Class - 35: May have been / Might have been",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_may_have_been", "hv_might_have_been", "v_ing"],
      "edgeIds": ["e_all_pronouns_may_have_been", "e_may_have_been_ing", "e_all_pronouns_might_have_been", "e_might_have_been_ing"],
      "additionalData": {
        "telugu_meaning": "ఒక పని చేస్తూ ఉండి ఉండొచ్చు"
      }
    },
    "class-36": {
      "title": "Class - 36: Have to / Has to & Shall have to / Will have to",
      "layout": "modal-verb-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_have_to", "hv_has_to", "hv_shall_have_to", "hv_will_have_to", "v_base"],
      "edgeIds": ["e_group1_have_to", "e_group2_has_to", "e_have_to_base", "e_has_to_base", "e_group1_shall_have_to", "e_group2_will_have_to", "e_shall_have_to_base", "e_will_have_to_base"],
      "additionalData": {
        "present": {
          "use": "It denotes the duty of a doer",
          "telugu_meaning": "చేయాల్సి ఉంది అని తెలిపినప్పుడు",
          "negative_contractions": [
            { "form": "do + not + have to -> don't have to" },
            { "form": "does + not + have to -> doesn't have to" }
          ]
        },
        "future": {
          "use": "To express the future duty of a doer",
          "telugu_meaning": "ఒక పని భవిష్యత్తులో చేయాల్సి వస్తుంది అని తెలిపినప్పుడు",
          "negative_contractions": [
            { "form": "shall + not + have to -> shan't have to" },
            { "form": "will + not + have to -> won't have to" }
          ]
        }
      }
    },
    "class-37": {
      "title": "Class - 37: Dare to, Ought to, Need to",
      "layout": "modal-verb-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_dare_to", "hv_dares_to", "hv_ought_to", "hv_need_to", "hv_needs_to", "v_base"],
      "edgeIds": ["e_group1_dare_to", "e_group2_dares_to", "e_dare_to_base", "e_dares_to_base", "e_all_pronouns_ought_to", "e_ought_to_base", "e_group1_need_to", "e_group2_needs_to", "e_need_to_base", "e_needs_to_base"],
      "additionalData": {
        "dare": {
          "use": "It denotes the courage/boldness of a doer",
          "telugu_meaning": "ఒక పనిని ధైర్యంగా చేస్తాను/చేస్తాము అని తెలిపినప్పుడు",
          "negative_contractions": [
            { "form": "do + not + dare to -> don't dare to" },
            { "form": "does + not + dare to -> doesn't dare to" }
          ]
        },
        "ought": {
          "use": "It denotes the moral obligation of a doer",
          "telugu_meaning": "ఒక పనిని బాధ్యతగా చేయాలి అని తెలిపినప్పుడు",
          "negative_contractions": [
            { "form": "do + not + ought to -> don't ought to" },
            { "form": "does + not + ought to -> doesn't ought to" }
          ]
        },
        "need": {
          "use": "It denotes the necessity of a doer",
          "telugu_meaning": "ఏదైనా ఒక పనిని చేయాల్సిన అవసరం ఉంది అని తెలిపినప్పుడు",
          "negative_contractions": [
            { "form": "do + not + need to -> don't need to" },
            { "form": "does + not + need to -> doesn't need to" }
          ]
        }
      }
    },
    "class-38": {
      "title": "Class - 38: Want to, Wish to, Would like to, Wanted to",
      "layout": "modal-verb-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_want_to", "hv_wants_to", "hv_wish_to", "hv_wishes_to", "hv_would_like_to", "hv_wanted_to", "v_base"],
      "edgeIds": ["e_group1_want_to", "e_group2_wants_to", "e_want_to_base", "e_wants_to_base", "e_group1_wish_to", "e_group2_wishes_to", "e_wish_to_base", "e_wishes_to_base", "e_all_pronouns_would_like_to", "e_would_like_to_base", "e_all_pronouns_wanted_to", "e_wanted_to_base"],
      "additionalData": {
        "want": { "use": "It denotes the wish / desire of a doer", "telugu_meaning": "ఏదైనా ఒక పనిని చేయాలనుకుంటున్నాను" },
        "wish": { "use": "It denotes the wish / desire of a doer", "telugu_meaning": "ఏదైనా ఒక పనిని చేయాలనుకుంటున్నాను" },
        "would_like": { "use": "It denotes the wish / desire of a doer", "telugu_meaning": "ఏదైనా ఒక పనిని చేయాలనుకుంటున్నాను" },
        "wanted": { "use": "It denotes the past unfulfilled wish or desire of a doer", "telugu_meaning": "ఏదైనా ఒక పనిని గతంలో చేయాలనుకుని చేయలేదని తెలిపినప్పుడు" }
      }
    },
    "class-40": {
      "title": "Class - 40: Had to (Past Obligation)",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_had_to", "v_base"],
      "edgeIds": ["e_all_pronouns_had_to", "e_had_to_base"],
      "additionalData": {
        "use": "Past obligation",
        "telugu_meaning": "చేయాల్సి వచ్చింది",
        "negative_contractions": [
          { "form": "did + not + have to -> didn't have to" }
        ]
      }
    },
    "class-41": {
      "title": "Class - 41: Used to (Past Habitual Actions)",
      "layout": "rule-summary-table",
      "nodeIds": ["p_i", "p_we", "p_you", "p_they", "p_he", "p_she", "p_it", "hv_used_to", "v_base"],
      "edgeIds": ["e_all_pronouns_used_to", "e_used_to_base"],
      "additionalData": {
        "use": "It denotes past habitual actions",
        "telugu_meaning": "ఒక పనిని గతంలో అలవాటుగా చేసేవాడిని అని తెలిపినప్పుడు"
      }
    },
    "class-42": {
      "title": "Class - 42: TENSES - Time of an action",
      "layout": "tense-grid",
      "nodeIds":,
      "edgeIds":,
      "additionalData": {
        "grid": {
          "present": {
            "simple": "do/does + verb (v1 form)",
            "continuous": "am/is/are + verb (-ing form)",
            "perfect": "have/has + verb (p.p.form)",
            "perfect_continuous": "have been/has been + verb (-ing form)"
          },
          "past": {
            "simple": "did + verb (v1 form)",
            "continuous": "was/were + verb (-ing form)",
            "perfect": "had + verb (p.p.form)",
            "perfect_continuous": "had been + verb (-ing form)"
          },
          "future": {
            "simple": "shall/will + verb (v1 form)",
            "continuous": "shall be/will be + verb (-ing form)",
            "perfect": "shall have/will have + verb (p.p.form)",
            "perfect_continuous": "shall have been/will have been + verb (-ing form)"
          }
        }
      }
    }
  }
};

