const diagram_data = {
  "nodes": [], // <-- FIXED (was "nodes":,)
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
    { "id": "e_i_have", "source": "p_i", "target": "hv_have" },
    { "id": "e_we_have", "source": "p_we", "target": "hv_have" },
    { "id": "e_you_have", "source": "p_you", "target": "hv_have" },
    { "id": "e_they_have", "source": "p_they", "target": "hv_have" },
    { "id": "e_he_has", "source": "p_he", "target": "hv_has" },
    { "id": "e_she_has", "source": "p_she", "target": "hv_has" },
    { "id": "e_it_has", "source": "p_it", "target": "hv_has" },
    { "id": "e_have_v3", "source": "hv_have", "target": "v_v3" },
    { "id": "e_has_v3", "source": "hv_has", "target": "v_v3" },
    { "id": "e_have_been", "source": "hv_have", "target": "hv_been" },
    { "id": "e_has_been", "source": "hv_has", "target": "hv_been" },
    { "id": "e_been_ing", "source": "hv_been", "target": "v_ing" },
    { "id": "e_i_was", "source": "p_i", "target": "hv_was" },
    { "id": "e_he_was", "source": "p_he", "target": "hv_was" },
    { "id": "e_she_was", "source": "p_she", "target": "hv_was" },
    { "id": "e_it_was", "source": "p_it", "target": "hv_was" },
    { "id": "e_we_were", "source": "p_we", "target": "hv_were" },
    { "id": "e_you_were", "source": "p_you", "target": "hv_were" },
    { "id": "e_they_were", "source": "p_they", "target": "hv_were" },
    { "id": "e_was_ing", "source": "hv_was", "target": "v_ing" },
    { "id": "e_were_ing", "source": "hv_were", "target": "v_ing" },
    { "id": "e_all_pronouns_did", "source": "all_pronouns", "target": "hv_did" },
    { "id": "e_did_base", "source": "hv_did", "target": "v_base" },
    { "id": "e_all_pronouns_had", "source": "all_pronouns", "target": "hv_had" },
    { "id": "e_had_v3", "source": "hv_had", "target": "v_v3" },
    { "id": "e_had_been", "source": "hv_had", "target": "hv_been" },
    { "id": "e_all_pronouns_will", "source": "all_pronouns", "target": "hv_will" },
    { "id": "e_will_base", "source": "hv_will", "target": "v_base" },
    { "id": "e_will_be", "source": "hv_will", "target": "hv_be" },
    { "id":li": "e_be_ing", "source": "hv_be", "target": "v_ing" },
    { "id": "e_will_have", "source": "hv_will", "target": "hv_have_f" },
    { "id": "e_have_f_v3", "source": "hv_have_f", "target": "v_v3" },
    { "id": "e_have_f_been", "source": "hv_have_f", "target": "hv_been" },
    { "id": "e_all_pronouns_used_to", "source": "all_pronouns", "target": "hv_used_to" },
    { "id": "e_used_to_base", "source": "hv_used_to", "target": "v_base" }
  ],
  "classData": {
    "class-1": {
      "title": "Class - 1: Pronouns",
      "layout": "table",
      "nodeIds": [],
      "edgeIds": [],
      "additionalData": {
        "columns": ["Subject Pronouns", "Object Pronouns"],
        "rows": [
          ["I (నేను)", "Me (నాకు/నన్ను)"],
          ["We (మేము)", "Us (మాకు/మమ్మల్ని)"],
          ["You (నీవు/మీరు)", "You (నీకు/నిన్ను/మీకు/మిమ్మల్ని)"],
          ["They (వారు/అవి)", "Them (వారికి/వారిని/వాటికి/వాటిని)"],
          ["He (అతడు)", "Him (అతనికి/అతడిని)"],
          ["She (ఆమె)", "Her (ఆమెకు/ఆమెను)"],
          ["It (ఇది/అది)", "It (దీనికి/దానిని)"]
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
      "nodeIds": [], // <-- FIXED (was "nodeIds":,)
      "edgeIds": [], // <-- FIXED (was "edgeIds":,)
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
            "simple": "will + verb (v1 form)",
            "continuous": "will be + verb (-ing form)",
            "perfect": "will have + verb (p.p.form)",
            "perfect_continuous": "will have been + verb (-ing form)"
          }
        }
      }
    }
  }
};

