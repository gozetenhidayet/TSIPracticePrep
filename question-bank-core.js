

const SAT_QUESTIONS = [
{id:"SAT-RW-II-0001",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Easy",passage:"Researchers studying urban trees found that neighborhoods with greater tree-canopy coverage were often several degrees cooler during summer afternoons than nearby neighborhoods with less shade.",q:"Which choice best states the main idea of the passage?",choices:["Urban trees can help reduce neighborhood heat.","Trees grow faster in cities than in forests.","Summer temperatures are identical across neighborhoods.","Researchers studied only rural areas."],a:0,ex:"The passage directly connects greater tree-canopy coverage with cooler summer temperatures.",why:["This captures the central finding.","Growth rate is not discussed.","The passage says temperatures differed.","The research described urban neighborhoods."],strategy:"Choose the option that summarizes the passage's central claim rather than a minor or invented detail."},
{id:"SAT-RW-CS-0001",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Medium",passage:"The scientist described the early results as 'tentative,' noting that additional trials would be needed before a firm conclusion could be reached.",q:"As used in the passage, “tentative” most nearly means:",choices:["final","uncertain","careless","enthusiastic"],a:1,ex:"Because additional trials are needed before a firm conclusion, 'tentative' means provisional or uncertain.",why:["Final contradicts the context.","Uncertain fits the context.","Careless is not suggested.","Enthusiastic concerns emotion, not certainty."],strategy:"Use nearby context clues, especially words showing certainty, contrast, or qualification."},
{id:"SAT-RW-EOI-0001",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Medium",q:"The city expanded its network of protected bike lanes. ______, bicycle commuting increased over the following year.",choices:["For example","As a result","In contrast","Likewise"],a:1,ex:"The second sentence presents an outcome following the expansion, so 'As a result' best expresses cause and effect.",why:["For example introduces an example.","As a result correctly signals consequence.","In contrast signals opposition.","Likewise signals similarity."],strategy:"Identify the logical relationship between the two sentences before choosing a transition."},
{id:"SAT-RW-SEC-0001",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Easy",q:"Which choice completes the sentence so that it conforms to Standard English? “The collection of rare books _____ stored in a climate-controlled room.”",choices:["are","were","is","have been"],a:2,ex:"The subject is the singular noun 'collection,' so the singular verb 'is' is correct.",why:["Are is plural.","Were is plural past tense.","Is agrees with singular collection.","Have been is plural."],strategy:"Ignore interrupting prepositional phrases and identify the true grammatical subject."},
{id:"SAT-RW-II-0002",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Hard",passage:"A survey found that 68% of respondents preferred receiving appointment reminders by text message, 21% preferred email, and 11% preferred phone calls.",q:"Which statement is best supported by the data?",choices:["Most respondents preferred text-message reminders.","Email was preferred by more than half of respondents.","Phone calls and texts were equally preferred.","No respondent preferred phone calls."],a:0,ex:"Sixty-eight percent is a clear majority, so most respondents preferred text messages.",why:["This matches the 68% result.","Email was 21%, not over half.","68% and 11% are not equal.","11% did prefer phone calls."],strategy:"Translate percentages into precise claims; avoid stronger statements than the data support."},
{id:"SAT-MATH-ALG-0001",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Easy",q:"If 5x − 9 = 26, what is the value of x?",choices:["5","7","17","35"],a:1,ex:"Add 9 to both sides: 5x=35. Divide by 5: x=7.",why:["5 gives 16.","7 satisfies the equation.","17 is too large.","35 is 5x before division."],strategy:"Isolate the variable using inverse operations."},
{id:"SAT-MATH-ADV-0001",calculatorAllowed:true,section:"Math",skill:"Advanced Math",difficulty:"Medium",q:"Which expression is equivalent to x² − 9?",choices:["(x−9)(x+1)","(x−3)(x+3)","(x−3)²","x(x−9)"],a:1,ex:"x²−9 is a difference of squares: x²−3²=(x−3)(x+3).",why:["This expands incorrectly.","This is the difference-of-squares factorization.","This equals x²−6x+9.","This equals x²−9x."],strategy:"Recognize a²−b²=(a−b)(a+b)."},
{id:"SAT-MATH-PSDA-0001",calculatorAllowed:true,section:"Math",skill:"Problem-Solving & Data Analysis",difficulty:"Medium",q:"A school club has 18 ninth graders and 12 tenth graders. What percent of the club members are tenth graders?",choices:["30%","40%","60%","67%"],a:1,ex:"There are 30 members total. 12/30=0.40=40%.",why:["30% uses 9 of 30.","40% is correct.","60% is the ninth-grade percentage.","67% is not the correct ratio."],strategy:"Percent = part ÷ whole × 100."},
{id:"SAT-MATH-GT-0001",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"A circle has radius 5. What is its area?",choices:["5π","10π","25π","50π"],a:2,ex:"Area of a circle is πr². With r=5, area=25π.",why:["5π omits the square.","10π uses diameter incorrectly.","25π is correct.","50π is twice the correct area."],strategy:"Distinguish circle area πr² from circumference 2πr."},
{id:"SAT-MATH-ALG-0002",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Hard",q:"The line y=3x+2 is shifted upward 5 units. Which equation represents the new line?",choices:["y=3x+7","y=8x+2","y=3x−3","y=5x+2"],a:0,ex:"A vertical shift upward by 5 adds 5 to the output: y=3x+2+5=3x+7.",why:["This correctly raises the intercept by 5.","This changes slope.","This shifts downward.","This changes slope rather than vertical position."],strategy:"A vertical shift changes the constant term, not the slope."}
,
{id:"SAT-B1RW-WIC-001",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Medium",passage:"Archaeologists studying a coastal settlement found shells from distant waters in household sites, suggesting that trade networks were more ______ than scholars had assumed.",q:"Which choice completes the text with the most logical and precise word or phrase?",choices:["accidental","limited","extensive","temporary"],a:2,ex:"Distant-origin shells support broad trade connections, so 'extensive' is most precise.",why:["Finding shells from distant waters in multiple household sites reflects a regular pattern, not a single accident.","Shells from distant waters imply wide-reaching, not limited, trade connections.","Correct — distant-origin shells across household sites point to trade networks that reached farther than scholars assumed.","Nothing in the passage suggests the trade networks were short-lived; the finding points to their reach, not their duration."],strategy:"Look for the word that matches the scale or intensity the evidence supports, not just a plausible-sounding synonym."},
{id:"SAT-B1RW-WIC-002",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Hard",passage:"Because the manuscript contains several passages absent from later copies, historians consider it especially ______ for reconstructing the earliest version of the text.",q:"Which choice completes the text with the most logical and precise word or phrase?",choices:["decorative","valuable","predictable","ordinary"],a:1,ex:"Unique surviving material makes the manuscript valuable to reconstruction.",why:["The passage discusses the manuscript's usefulness for research, not its appearance.","Correct — unique passages missing from later copies make this manuscript especially useful for recovering the earliest version of the text.","Containing unique material makes the manuscript notable, not predictable.","A manuscript with content found nowhere else is the opposite of ordinary."],strategy:"Ask what specific detail in the sentence justifies the blank, then match a word to that reason."},
{id:"SAT-B1RW-WIC-003",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Easy",passage:"The engineer described the prototype as ______, emphasizing that further testing was necessary before production.",q:"Which choice completes the text with the most logical and precise word or phrase?",choices:["preliminary","final","obsolete","flawless"],a:0,ex:"Further testing means the design is preliminary, not final.",why:["Correct — needing further testing before production means the results are early-stage, not final.","‘Final’ contradicts the stated need for more testing.","‘Obsolete’ implies the prototype is outdated, which isn't supported.","Needing further testing suggests the prototype hasn't been proven flawless yet."],strategy:"When a sentence explains why more work is needed, look for a word describing an early or unfinished stage."},
{id:"SAT-B1RW-WIC-004",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Medium",passage:"Although the desert plant appears fragile, its root system is remarkably ______, extending meters underground to reach scarce water.",q:"Which choice completes the text with the most logical and precise word or phrase?",choices:["shallow","resilient","ornamental","random"],a:1,ex:"A root system enabling survival in harsh conditions is resilient.",why:["‘Shallow’ contradicts ‘extending meters underground.’","Correct — a root system that extends deep to reach scarce water is tough and adaptable, i.e., resilient.","The sentence describes function (finding water), not appearance.","Extending meters underground to reach water is a purposeful adaptation, not a random pattern."],strategy:"Match the blank to the specific supporting detail given right after it."},
{id:"SAT-B1RW-WIC-005",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Hard",passage:"The committee's initial proposal was intentionally ______, leaving room for revision after public feedback.",q:"Which choice completes the text with the most logical and precise word or phrase?",choices:["irrelevant","rigid","secretive","provisional"],a:3,ex:"A proposal meant to be revised is provisional.",why:["The sentence says the proposal leaves room for revision — nothing suggests it lacked relevance.","‘Rigid’ means fixed and unchangeable, the opposite of leaving room for revision.","Public feedback implies openness, not secrecy.","Correct — intentionally leaving room for revision after feedback describes a provisional, not-yet-final proposal."],strategy:"When the sentence describes openness to future change, look for a word meaning ‘temporary’ or ‘not yet final.’"},
{id:"SAT-B1RW-WIC-007",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Medium",passage:"The poet's imagery is unusually ______: a few carefully chosen details create a vivid setting without lengthy description.",q:"Which choice completes the text with the most logical and precise word or phrase?",choices:["economical","technical","confusing","repetitive"],a:0,ex:"Using few details efficiently is economical.",why:["Correct — using ‘a few carefully chosen details’ to create a vivid setting is the definition of economical, efficient imagery.","Nothing about specialized or technical language is described.","A vivid, effective setting is the opposite of confusing.","‘A few carefully chosen details’ is the opposite of repetitive."],strategy:"Look at the explanation that follows the blank — it usually restates the meaning you need."},
{id:"SAT-B1RW-WIC-009",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Easy",passage:"The historian argues that the reform was not a sudden break but a ______ development unfolding over decades.",q:"Which choice completes the text with the most logical and precise word or phrase?",choices:["secret","random","brief","gradual"],a:3,ex:"A development unfolding over decades is gradual.",why:["The sentence discusses timing and pace, not secrecy.","‘Unfolding over decades’ describes a steady process, not a random one.","‘Brief’ contradicts ‘unfolding over decades.’","Correct — ‘not a sudden break’ and ‘unfolding over decades’ both point to a slow, gradual process."],strategy:"Contrast phrases like ‘not a sudden break’ often signal the opposite quality in the blank."},
{id:"SAT-B1RW-WIC-011",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Hard",passage:"The researcher used several independent data sets to ______ the reliability of the original finding.",q:"Which choice completes the text with the most logical and precise word or phrase?",choices:["ignore","simplify","assess","undermine"],a:2,ex:"Independent data sets can be used to assess reliability.",why:["Using several independent data sets is a way of examining the finding, not ignoring it.","Cross-checking with multiple data sets adds rigor; it doesn't simplify the analysis.","Correct — using several independent sources to check a finding's reliability is exactly what ‘assess’ means here.","The sentence doesn't say the finding was disproven, only that its reliability was being checked."],strategy:"Identify whether the surrounding sentence describes a supportive or a critical action, then match the tone of the word."},
{id:"SAT-B1RW-MAIN-001",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Hard",passage:"Researchers placed temperature sensors on city blocks with different amounts of tree cover. Blocks with mature shade trees were consistently cooler in the late afternoon than nearby blocks with little vegetation. The researchers note that tree planting cannot replace broader climate policy, but it can reduce heat exposure at the neighborhood level.",q:"Which choice best states the main idea of the text?",choices:["Temperature sensors are unreliable in cities.","Urban tree cover can help reduce local heat exposure.","Mature trees grow faster on hotter blocks.","Climate policy should focus only on planting trees."],a:1,ex:"Urban tree cover can help reduce local heat exposure.",why:["The passage is about measuring temperature differences, not about equipment being unreliable.","Correct — the sensor data and the researchers' own conclusion both support this as the passage's central point.","The passage never compares tree growth rates across blocks.","The passage explicitly says tree planting ‘cannot replace broader climate policy,’ so this overstates the researchers' claim."],strategy:"The main idea should match both the evidence given and any explicit qualifying statement the author makes."},
{id:"SAT-B1RW-MAIN-002",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Easy",passage:"A composer spent months studying recordings of train stations, markets, and public squares. Rather than reproducing those sounds directly, she used their rhythms to shape an orchestral work. The resulting music translates patterns of urban movement into musical form.",q:"Which choice best states the main purpose of the text?",choices:["To compare the acoustics of train stations and markets","To describe why cities are noisier than rural areas","To explain how a composer transformed features of city soundscapes into music","To argue that orchestral music should include recordings of public places"],a:2,ex:"To explain how a composer transformed features of city soundscapes into music",why:["The passage doesn't compare the specific acoustics of the two locations, only how their rhythms inspired the piece.","Noise levels in cities versus rural areas are never discussed.","Correct — the passage centers on how the composer turned urban sound patterns into a musical work.","The passage describes what one composer did; it doesn't argue for a general rule about orchestral music."],strategy:"For purpose questions, ask what the passage is doing — explaining, comparing, arguing — not only what it's about."},
{id:"SAT-B1RW-MAIN-003",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Medium",passage:"When a volcanic island first forms, its bare rock contains little soil. Over time, lichens and microbes help break the rock down, wind carries in organic material, and plants begin to establish. These processes gradually create conditions that support more complex communities.",q:"Which choice best states the main idea of the text?",choices:["Lichens are the only organisms that can survive on volcanic islands.","Complex communities appear immediately after eruptions.","Wind prevents soil from forming on new islands.","New volcanic islands gradually become able to support increasingly complex life."],a:3,ex:"New volcanic islands gradually become able to support increasingly complex life.",why:["The passage lists lichens as one part of a longer process, not the only organism that can survive.","The passage says these processes happen ‘over time,’ the opposite of immediately.","Wind is described as helping bring in organic material, not preventing soil formation.","Correct — the passage traces a gradual sequence from bare rock to conditions supporting more complex life."],strategy:"Watch for words like ‘immediately’ or ‘only’ in wrong choices — they usually overstate what a gradual-process passage actually says."},
{id:"SAT-B1RW-MAIN-004",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Hard",passage:"Historian Maya Chen examined letters written by factory workers during the 1910s. Many letters describe wages and hours, but they also discuss music, sports, and neighborhood celebrations. Chen argues that these records complicate portrayals of workers' lives as defined entirely by labor.",q:"Which choice best states the function of the final sentence?",choices:["It introduces a new type of historical source.","It contradicts the information contained in the letters.","It explains why factory wages increased.","It presents Chen's interpretation of the evidence described earlier."],a:3,ex:"It presents Chen's interpretation of the evidence described earlier.",why:["The letters were already introduced earlier in the passage; this sentence doesn't introduce a new source.","The final sentence builds on the letters' content rather than contradicting it.","Wages are mentioned only as one topic in the letters; the final sentence isn't about explaining a wage increase.","Correct — after describing what the letters contain, the final sentence gives Chen's argument about what that evidence means."],strategy:"For ‘function’ questions, identify what the sentence does in relation to the sentence(s) right before it."},
{id:"SAT-B1RW-MAIN-006",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Medium",passage:"An archaeologist notes that a ceramic style appears at several distant sites during the same century. She cautions, however, that similar designs can arise independently. Therefore, the shared style alone cannot establish direct contact among the communities.",q:"What is the main purpose of the text?",choices:["To argue that similar designs never arise independently","To explain why one type of evidence is insufficient to prove contact among communities","To prove that the communities traded ceramics directly","To describe how ceramic designs were manufactured"],a:1,ex:"To explain why one type of evidence is insufficient to prove contact among communities",why:["The passage says similar designs CAN arise independently — the opposite of this choice.","Correct — the passage explains that a shared ceramic style alone can't prove contact because similar designs can appear independently.","The passage explicitly says the shared style ‘cannot establish direct contact,’ the opposite of proving trade.","Manufacturing methods are never discussed."],strategy:"When an author raises a caution or limitation, the purpose is often to qualify a conclusion, not to prove one."},
{id:"SAT-B1RW-MAIN-008",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Easy",passage:"A city converted a former parking lot into a wetland park. During heavy rain, the wetland temporarily stores stormwater and releases it slowly, reducing pressure on drainage pipes. It also provides habitat for birds and insects.",q:"Which choice best states the main purpose?",choices:["To compare birds with insects in urban environments","To argue that all drainage pipes should be removed","To explain why parking lots are essential for drainage","To describe multiple benefits of converting a paved area into a wetland"],a:3,ex:"To describe multiple benefits of converting a paved area into a wetland",why:["Birds and insects are mentioned as one benefit, not as a comparison being drawn.","The passage never argues pipes should be removed, only that pressure on them is reduced.","The passage describes converting a parking lot away from its original use, the opposite of saying lots are essential.","Correct — the passage lists stormwater management and habitat as two distinct benefits of the conversion."],strategy:"When a passage lists more than one outcome or benefit, the main idea usually needs to cover all of them, not just one."},
{id:"SAT-B1RW-MAIN-009",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Medium",passage:"Marine biologists observed that a reef fish changes color when certain predators approach. The color shift does not make the fish less visible; instead, it appears to signal nearby members of the same species. Researchers are testing whether the signal helps coordinate escape behavior.",q:"Which choice best states the main idea?",choices:["All reef fish use identical warning signals.","A reef fish's color change may function as a warning signal to other fish.","Predators are unable to see the fish after it changes color.","The fish changes color primarily to camouflage itself."],a:1,ex:"A reef fish's color change may function as a warning signal to other fish.",why:["The passage discusses one species; it makes no claim about all reef fish.","Correct — the passage states researchers think the color shift signals other fish, functioning as a possible warning.","The passage says the change doesn't make the fish less visible, which contradicts this choice.","The passage explicitly says the change does NOT make the fish less visible, ruling out camouflage as the purpose."],strategy:"Watch for choices that sound plausible but are directly contradicted by a specific sentence in the passage."},
{id:"SAT-B1RW-MAIN-011",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Easy",passage:"Ecologists restored native grasses to several roadside areas and compared them with nearby conventional turf. After two years, the native-grass plots supported more pollinator species and required less irrigation. The researchers conclude that roadside planting choices can affect both biodiversity and water use.",q:"Which choice best states the main idea?",choices:["Conventional turf supports more pollinator species.","Native roadside grasses may benefit pollinators while reducing irrigation needs.","Native grasses require more water than turf.","Roadside areas cannot contribute to biodiversity."],a:1,ex:"Native roadside grasses may benefit pollinators while reducing irrigation needs.",why:["This reverses the passage's finding — native-grass plots supported more pollinator species, not conventional turf.","Correct — the passage states native-grass plots supported more pollinators and needed less irrigation.","The passage says native grasses required LESS irrigation, not more.","The passage's entire point is that roadside planting choices DO affect biodiversity."],strategy:"Check comparison words like ‘more’ and ‘less’ carefully — reversed comparisons are a common wrong-choice trick."},
{id:"SAT-B1RW-MAIN-013",section:"Reading & Writing",skill:"Craft & Structure",difficulty:"Hard",passage:"Engineers tested a bridge sensor during ordinary traffic and controlled loading. Its readings closely matched measurements from established instruments in both settings. This agreement supports using the new sensor for routine structural monitoring.",q:"Which choice best describes the function of the second sentence?",choices:["It explains why established instruments are inaccurate.","It describes how traffic volume has changed.","It introduces the reason the bridge was built.","It provides evidence supporting the sensor's reliability."],a:3,ex:"It provides evidence supporting the sensor's reliability.",why:["The passage says the new sensor's readings matched the established instruments, not that those instruments were inaccurate.","Traffic volume trends over time are never discussed.","The reason the bridge was originally built isn't mentioned in the passage.","Correct — the close match to established instruments is the evidence that supports trusting the new sensor."],strategy:"Ask what claim the sentence right before it is making, and how the sentence in question relates to that claim."},
{id:"SAT-B1RW-MAIN-015",section:"Reading & Writing",skill:"Information & Ideas",difficulty:"Medium",passage:"Researchers studying sleep asked participants to learn pairs of words, then tested them after either a full night's sleep or an equivalent period awake. The sleep group remembered more pairs on average. The researchers caution that the study does not show that sleep benefits every type of memory equally.",q:"Which choice best states the main idea?",choices:["Word-pair learning does not depend on sleep.","Sleep was associated with better recall in this task, though the finding may not generalize to all memory.","Participants who stayed awake remembered more pairs.","The study proves all forms of memory improve equally during sleep."],a:1,ex:"Sleep was associated with better recall in this task, though the finding may not generalize to all memory.",why:["The sleep group remembered more pairs, so learning was affected by sleep in this study.","Correct — this reflects both the study's finding (better recall after sleep) and the researchers' explicit caution about generalizing.","This reverses the passage's finding; the sleep group, not the awake group, remembered more.","The passage explicitly cautions against this exact overgeneralization."],strategy:"When a passage includes a researcher's own caution or limitation, the correct main idea usually includes that caution, not just the headline result."},
{id:"SAT-B1RW-SEC-001",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Medium",passage:"The collection of meteorite fragments ______ stored in a climate-controlled cabinet.",q:"Which choice completes the text so that it conforms to the conventions of Standard English?",choices:["have been","is","were","are"],a:1,ex:"The correct choice is “is.” Correct — ‘collection’ is a singular noun, so it takes the singular verb ‘is.’",why:["Plural, past tense; the singular subject ‘collection’ needs a singular, present-tense verb here.","Correct — ‘collection’ is a singular noun, so it takes the singular verb ‘is.’","Plural past tense; doesn't match the singular subject ‘collection.’","Plural; doesn't match the singular subject ‘collection.’"],strategy:"Collective nouns like ‘collection,’ ‘group,’ and ‘series’ are singular — pair them with a singular verb."},
{id:"SAT-B1RW-SEC-002",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Hard",passage:"Researchers at the coastal laboratory ______ samples every morning before sunrise.",q:"Which choice completes the text so that it conforms to the conventions of Standard English?",choices:["has collected","collect","collects","collecting"],a:1,ex:"The correct choice is “collect.” Correct — ‘Researchers’ is plural, so the plural verb ‘collect’ agrees.",why:["Singular present-perfect; the subject ‘Researchers’ is plural.","Correct — ‘Researchers’ is plural, so the plural verb ‘collect’ agrees.","This is the singular form; it doesn't agree with the plural subject ‘Researchers.’","This form can't stand alone as the sentence's main verb here."],strategy:"Identify whether the subject is singular or plural before matching the verb form."},
{id:"SAT-B1RW-SEC-003",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Easy",passage:"The mural, along with several smaller paintings, ______ restored last summer.",q:"Which choice completes the text so that it conforms to the conventions of Standard English?",choices:["were","have been","are","was"],a:3,ex:"The correct choice is “was.” Correct — ‘along with several smaller paintings’ is an interrupting phrase; the true subject is the singular ‘mural,’ which takes ‘was.’",why:["Plural; the subject is the singular noun ‘mural,’ not the interrupting phrase.","Plural present-perfect; doesn't match the singular subject.","Plural present tense; doesn't match the singular subject or the past-tense context (‘last summer’).","Correct — ‘along with several smaller paintings’ is an interrupting phrase; the true subject is the singular ‘mural,’ which takes ‘was.’"],strategy:"Phrases like ‘along with,’ ‘as well as,’ and ‘in addition to’ don't make the subject plural — find the true subject before the interrupting phrase."},
{id:"SAT-B1RW-SEC-004",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Medium",passage:"Neither the maps nor the journal ______ the exact location of the campsite.",q:"Which choice completes the text so that it conforms to the conventions of Standard English?",choices:["identifies","identifying","have identified","identify"],a:0,ex:"The correct choice is “identifies.” Correct — with ‘neither...nor,’ the verb agrees with the closer subject, the singular ‘journal,’ so ‘identifies’ is correct.",why:["Correct — with ‘neither...nor,’ the verb agrees with the closer subject, the singular ‘journal,’ so ‘identifies’ is correct.","This form can't serve as the sentence's main verb.","Plural present-perfect; the nearer subject ‘journal’ is singular.","Plural form; doesn't agree with the nearer singular subject ‘journal.’"],strategy:"With ‘neither...nor’ or ‘either...or,’ match the verb to the subject closest to it."},
{id:"SAT-B1RW-SEC-006",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Easy",passage:"The river flooded repeatedly in the 1920s ______ engineers later constructed a system of levees.",q:"Which choice completes the text so that it conforms to the conventions of Standard English?",choices:["although","and",";","because,"],a:2,ex:"The correct choice is “;.” Correct — both sides are independent clauses closely related in meaning, so a semicolon correctly joins them without a conjunction.",why:["Using ‘although’ changes the intended relationship rather than simply joining the two complete sentences shown.","Bare ‘and’ with no comma before it creates a run-on here, since both sides are full independent clauses.","Correct — both sides are independent clauses closely related in meaning, so a semicolon correctly joins them without a conjunction.","A comma after ‘because’ is nonstandard punctuation and doesn't correctly join the two clauses."],strategy:"When two complete sentences are closely related, a semicolon can join them without needing a conjunction."},
{id:"SAT-B1RW-SEC-007",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Medium",passage:"The museum acquired the manuscript in 1974. ______ has remained in the collection ever since.",q:"Which choice completes the text so that it conforms to the conventions of Standard English?",choices:["They","Its","It's","It"],a:3,ex:"The correct choice is “It.” Correct — ‘It’ correctly and clearly refers back to the singular manuscript as the subject of the second sentence.",why:["Plural, but the sentence refers to a single manuscript, so a singular pronoun is needed.","‘Its’ is possessive, but this word needs to stand in for ‘the manuscript’ as a subject pronoun.","‘It's’ means ‘it is,’ which doesn't fit as the subject of ‘has remained.’","Correct — ‘It’ correctly and clearly refers back to the singular manuscript as the subject of the second sentence."],strategy:"Distinguish between ‘its’ (possessive), ‘it's’ (it is), and ‘it’ (subject pronoun) by testing what each one means in place."},
{id:"SAT-B1RW-SEC-009",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Easy",passage:"The comet passed closest to Earth on March 4, 2025 ______ astronomers observed it from several continents.",q:"Which choice completes the text so that it conforms to the conventions of Standard English?",choices:["who","which","when","where"],a:2,ex:"The correct choice is “when.” Correct — ‘when’ correctly introduces a clause describing the point in time that astronomers made their observation.",why:["‘Who’ refers to a person; the comet's closest approach is an event in time, not a person.","‘Which’ typically refers to a thing, not to the point in time being described here.","Correct — ‘when’ correctly introduces a clause describing the point in time that astronomers made their observation.","‘Where’ refers to a place, but the sentence describes a moment in time, not a location."],strategy:"Match the relative pronoun to what it refers to: who (person), which (thing), when (time), where (place)."},
{id:"SAT-B1RW-SEC-010",section:"Reading & Writing",skill:"Standard English Conventions",difficulty:"Medium",passage:"The laboratory's new microscope can magnify objects more clearly than ______ older instrument.",q:"Which choice completes the text so that it conforms to the conventions of Standard English?",choices:["its","their","there","it's"],a:0,ex:"The correct choice is “its.” Correct — ‘its’ is the possessive form needed to show the older instrument is associated with the laboratory.",why:["Correct — ‘its’ is the possessive form needed to show the older instrument is associated with the laboratory.","‘Their’ is plural, but the sentence compares the new microscope to a single older instrument.","‘There’ refers to a place and doesn't fit this possessive context.","‘It's’ means ‘it is,’ which doesn't make sense in place of a possessive here."],strategy:"Before choosing between its/it's/there/their, test whether the sentence needs a possessive, a contraction, or a location word."},
{id:"SAT-B1RW-TR-001",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Medium",passage:"The first experiment produced no measurable effect. ______, the researchers redesigned the procedure and tested it again.",q:"Which choice completes the text with the most logical transition?",choices:["Therefore","Meanwhile","Likewise","For example"],a:0,ex:"“Therefore” best expresses the logical relationship between the two statements.",why:["Correct — redesigning the procedure is a direct consequence of the failed first experiment, so ‘Therefore’ fits.","‘Meanwhile’ signals simultaneous events, not a cause-and-effect response.","‘Likewise’ signals similarity, but redesigning is a response to a problem, not a similar event.","‘For example’ introduces an illustration, not a resulting action."],strategy:"Ask whether the second sentence shows a cause, a contrast, an example, or a result before picking a transition."},
{id:"SAT-B1RW-TR-002",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Easy",passage:"The two species occupy similar habitats. ______, their feeding strategies are quite different.",q:"Which choice completes the text with the most logical transition?",choices:["However","For instance","Consequently","Similarly"],a:0,ex:"“However” best expresses the logical relationship between the two statements.",why:["Correct — similar habitats but different feeding strategies is a contrast, which ‘However’ correctly signals.","‘For instance’ introduces an example, not a contrast.","‘Consequently’ signals a result, but different feeding strategies isn't a result of shared habitat.","‘Similarly’ signals agreement, but the sentence describes a difference."],strategy:"Look for contrast words like ‘but,’ ‘yet,’ or ‘different’ in the second sentence — they usually call for a contrast transition."},
{id:"SAT-B1RW-TR-003",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Medium",passage:"The city added protected bike lanes downtown. ______, bicycle traffic increased the following year.",q:"Which choice completes the text with the most logical transition?",choices:["For example","Nevertheless","As a result","In contrast"],a:2,ex:"“As a result” best expresses the logical relationship between the two statements.",why:["‘For example’ introduces an illustration, not a consequence.","‘Nevertheless’ signals a contrast, but the traffic increase is a result of the bike lanes, not a contradiction.","Correct — the increase in bike traffic is a direct outcome of adding the protected lanes.","The second sentence supports the first rather than opposing it."],strategy:"A change followed by an outcome usually calls for a cause-and-effect transition like ‘as a result’ or ‘therefore.’"},
{id:"SAT-B1RW-TR-004",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Easy",passage:"The novel was widely praised when it appeared. ______, it sold relatively few copies during its first year.",q:"Which choice completes the text with the most logical transition?",choices:["Therefore","Likewise","Nevertheless","For example"],a:2,ex:"“Nevertheless” best expresses the logical relationship between the two statements.",why:["‘Therefore’ signals a result, but low sales isn't a consequence of praise — it's a contrast.","‘Likewise’ signals similarity, not the unexpected contrast described here.","Correct — being praised but selling few copies is a contrast, which ‘Nevertheless’ correctly signals.","‘For example’ introduces an illustration, not a contrasting outcome."],strategy:"When a sentence describes an unexpected or surprising outcome, look for a contrast transition."},
{id:"SAT-B1RW-TR-005",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Medium",passage:"Several metals expand when heated. ______, iron rails must be installed with small gaps that allow for expansion.",q:"Which choice completes the text with the most logical transition?",choices:["Similarly","In contrast","For this reason","Meanwhile"],a:2,ex:"“For this reason” best expresses the logical relationship between the two statements.",why:["‘Similarly’ signals a comparison, but the second sentence explains a consequence of the first.","There's no contrast here — rails needing gaps follows directly from metals expanding.","Correct — the need for expansion gaps is explained by the fact that metals expand when heated.","‘Meanwhile’ signals simultaneous but unrelated events, not a cause-and-effect relationship."],strategy:"When the second sentence explains why something is designed a certain way, look for a cause-and-effect transition."},
{id:"SAT-B1RW-TR-006",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Easy",passage:"The telescope can observe visible light. ______, it can detect some infrared wavelengths.",q:"Which choice completes the text with the most logical transition?",choices:["Consequently","Instead","In addition","Nevertheless"],a:2,ex:"“In addition” best expresses the logical relationship between the two statements.",why:["Detecting infrared isn't a result of observing visible light — both are separate capabilities being listed.","‘Instead’ signals replacement, but the telescope does both, not one instead of the other.","Correct — the sentence adds a second capability (infrared) to the first (visible light), which ‘In addition’ correctly signals.","There's no contrast between the two capabilities being described."],strategy:"When a sentence adds another item to a list of capabilities or facts, use an addition transition."},
{id:"SAT-B1RW-TR-007",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Medium",passage:"The first survey sampled only adults. ______, the follow-up study included teenagers as well.",q:"Which choice completes the text with the most logical transition?",choices:["For example","Therefore","By contrast","Similarly"],a:2,ex:"“By contrast” best expresses the logical relationship between the two statements.",why:["‘For example’ introduces an illustration, not a change in scope.","The follow-up study including teenagers isn't a logical consequence of the first survey's scope.","Correct — sampling only adults versus including teenagers as well is a contrast between the two studies' designs.","The two surveys are described as different in scope, not similar."],strategy:"Compare the two sentences directly — if their content differs, contrast transitions like ‘by contrast’ or ‘however’ usually fit."},
{id:"SAT-B1RW-TR-008",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Easy",passage:"Some desert plants store water in thick stems. ______, others survive drought by completing their life cycles rapidly after rain.",q:"Which choice completes the text with the most logical transition?",choices:["Therefore","Specifically","Alternatively","Indeed"],a:2,ex:"“Alternatively” best expresses the logical relationship between the two statements.",why:["The second strategy isn't a consequence of the first; both are separate strategies desert plants use.","‘Specifically’ would narrow the same idea, not introduce a different strategy.","Correct — storing water and rapidly completing a life cycle are two different strategies, which ‘Alternatively’ correctly signals.","‘Indeed’ signals agreement or emphasis, not a different option."],strategy:"When a sentence presents another option or a different approach, look for ‘alternatively’ or ‘or.’"},
{id:"SAT-B1RW-SYN-001",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Medium",passage:"While researching solar-powered desalination device, a student has taken the following notes:\n• uses sunlight to evaporate seawater.\n• condenses the vapor into fresh water.\n• was tested in a coastal village.\n• used 38% less grid electricity than a conventional unit.",q:"The student wants to emphasize the device's energy result. Which choice most effectively uses relevant information from the notes to accomplish this goal?",choices:["The device condenses vapor into fresh water.","The device was tested in a coastal village.","The device uses sunlight to evaporate seawater.","The device used 38% less grid electricity than a conventional unit."],a:3,ex:"The device used 38% less grid electricity than a conventional unit.",why:["This describes the device's basic function, not its energy performance.","This is a location detail; it doesn't address the device's energy result.","This explains how the device works, not its energy outcome.","Correct — the 38% reduction in grid electricity is the specific energy result the student wants to emphasize."],strategy:"Match the choice to the specific goal stated in the question — a note can be true but still not fit the requested emphasis."},
{id:"SAT-B1RW-SYN-002",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Hard",passage:"While researching Lila Morgan's archive project, a student has taken the following notes:\n• digitized 8,000 handwritten letters.\n• added searchable dates and locations.\n• made the collection available online.\n• enabled researchers to trace migration patterns across decades.",q:"The student wants to emphasize the project's research value. Which choice most effectively uses relevant information from the notes to accomplish this goal?",choices:["The project added searchable dates and locations.","The collection was made available online.","The project digitized 8,000 letters.","The project enabled researchers to trace migration patterns across decades."],a:3,ex:"The project enabled researchers to trace migration patterns across decades.",why:["This describes a feature of the archive, not its value to researchers.","Being available online is about access, not research value.","This states a fact about the project's scope, not the resulting research use.","Correct — enabling researchers to trace migration patterns directly demonstrates the project's research value."],strategy:"Distinguish between notes that describe what was done and notes that describe the resulting value or impact."},
{id:"SAT-B1RW-SYN-003",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Medium",passage:"While researching city pollinator garden, a student has taken the following notes:\n• contains 24 native flowering species.\n• blooms from early spring through late fall.\n• was planted beside a public library.\n• attracted more bee species than the previous lawn.",q:"The student wants to emphasize the garden's ecological result. Which choice most effectively uses relevant information from the notes to accomplish this goal?",choices:["The garden is located beside a library.","The garden attracted more bee species than the lawn it replaced.","The garden blooms for much of the year.","The garden contains 24 flowering species."],a:1,ex:"The garden attracted more bee species than the lawn it replaced.",why:["Location doesn't describe an ecological outcome.","Correct — attracting more bee species than the previous lawn is the specific ecological result the student wants to highlight.","Bloom duration is a feature of the garden, not a measured ecological result.","Number of species planted is a design detail, not an ecological outcome."],strategy:"An ‘ecological result’ note should describe an effect the change caused, not just describe the change itself."},
{id:"SAT-B1RW-SYN-004",section:"Reading & Writing",skill:"Expression of Ideas",difficulty:"Hard",passage:"While researching Ravi Shah's bridge sensor, a student has taken the following notes:\n• measures tiny changes in vibration.\n• can operate on battery power for two years.\n• was tested on three highway bridges.\n• matched readings from larger monitoring systems.",q:"The student wants to emphasize evidence of the sensor's reliability. Which choice most effectively uses relevant information from the notes to accomplish this goal?",choices:["The sensor measures vibration.","The bridge sensor matched readings from larger monitoring systems.","The sensor was tested on three bridges.","The sensor can run on battery power for two years."],a:1,ex:"The bridge sensor matched readings from larger monitoring systems.",why:["This describes the sensor's basic function, not evidence of reliability.","Correct — matching readings from established, larger monitoring systems is direct evidence that the new sensor is reliable.","Being tested on three bridges shows where it was tested, not whether its readings were accurate.","Battery life is a convenience feature, not evidence of measurement reliability."],strategy:"For ‘evidence of reliability’ goals, look for a note that compares performance against a trusted reference."},
{id:"SAT-B1M-ALG-01",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Medium",q:"A line passes through (1, 7) and (3, 11). What is its slope?",choices:["−2","3","2","1"],a:2,ex:"Slope = (y2−y1)/(x2−x1) = (11−(7))/(3−1) = 2.",why:["This comes from subtracting the x- and y-coordinates in reverse order, which flips the sign.","This treats the change in x as if it were the slope itself, without dividing by the change in y.","Correct — slope = (change in y) ÷ (change in x) = (11−(7)) ÷ (3−1) = 2.","This does not match (y2−y1) divided by (x2−x1) for these two points."],strategy:"Use the slope formula (y2−y1)/(x2−x1) and keep the order of subtraction consistent in both the top and bottom."},
{id:"SAT-B1M-ALG-02",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Medium",q:"A line passes through (1, 2) and (5, -10). What is its slope?",choices:["−4","−2","−3","3"],a:2,ex:"Slope = (y2−y1)/(x2−x1) = (-10−(2))/(5−1) = -3.",why:["This comes from subtracting the x- and y-coordinates in reverse order, which flips the sign.","This treats the change in x as if it were the slope itself, without dividing by the change in y.","Correct — slope = (change in y) ÷ (change in x) = (-10−(2)) ÷ (5−1) = -3.","This does not match (y2−y1) divided by (x2−x1) for these two points."],strategy:"Use the slope formula (y2−y1)/(x2−x1) and keep the order of subtraction consistent in both the top and bottom."},
{id:"SAT-B1M-ALG-03",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Medium",q:"A line passes through (1, 5) and (6, 25). What is its slope?",choices:["3","−4","4","5"],a:2,ex:"Slope = (y2−y1)/(x2−x1) = (25−(5))/(6−1) = 4.",why:["This comes from subtracting the x- and y-coordinates in reverse order, which flips the sign.","This treats the change in x as if it were the slope itself, without dividing by the change in y.","Correct — slope = (change in y) ÷ (change in x) = (25−(5)) ÷ (6−1) = 4.","This does not match (y2−y1) divided by (x2−x1) for these two points."],strategy:"Use the slope formula (y2−y1)/(x2−x1) and keep the order of subtraction consistent in both the top and bottom."},
{id:"SAT-B1M-ALG-04",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Medium",q:"A line passes through (1, -7) and (3, -15). What is its slope?",choices:["4","−5","−3","−4"],a:3,ex:"Slope = (y2−y1)/(x2−x1) = (-15−(-7))/(3−1) = -4.",why:["This comes from subtracting the x- and y-coordinates in reverse order, which flips the sign.","This treats the change in x as if it were the slope itself, without dividing by the change in y.","This does not match (y2−y1) divided by (x2−x1) for these two points.","Correct — slope = (change in y) ÷ (change in x) = (-15−(-7)) ÷ (3−1) = -4."],strategy:"Use the slope formula (y2−y1)/(x2−x1) and keep the order of subtraction consistent in both the top and bottom."},
{id:"SAT-B1M-ALG-05",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Medium",q:"A line passes through (1, -8) and (4, -17). What is its slope?",choices:["3","−4","−2","−3"],a:3,ex:"Slope = (y2−y1)/(x2−x1) = (-17−(-8))/(4−1) = -3.",why:["This comes from subtracting the x- and y-coordinates in reverse order, which flips the sign.","This treats the change in x as if it were the slope itself, without dividing by the change in y.","This does not match (y2−y1) divided by (x2−x1) for these two points.","Correct — slope = (change in y) ÷ (change in x) = (-17−(-8)) ÷ (4−1) = -3."],strategy:"Use the slope formula (y2−y1)/(x2−x1) and keep the order of subtraction consistent in both the top and bottom."},
{id:"SAT-B1M-ALG-06",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Medium",q:"A line passes through (1, 2) and (3, 10). What is its slope?",choices:["3","−4","5","4"],a:3,ex:"Slope = (y2−y1)/(x2−x1) = (10−(2))/(3−1) = 4.",why:["This comes from subtracting the x- and y-coordinates in reverse order, which flips the sign.","This treats the change in x as if it were the slope itself, without dividing by the change in y.","This does not match (y2−y1) divided by (x2−x1) for these two points.","Correct — slope = (change in y) ÷ (change in x) = (10−(2)) ÷ (3−1) = 4."],strategy:"Use the slope formula (y2−y1)/(x2−x1) and keep the order of subtraction consistent in both the top and bottom."},
{id:"SAT-B1M-ADV-01",calculatorAllowed:true,section:"Math",skill:"Advanced Math",difficulty:"Medium",q:"Which expression is equivalent to x² − 5x + 6?",choices:["(x−3)(x−2)","(x−3)²","(x−5)(x−6)","(x+3)(x+2)"],a:0,ex:"Find two numbers that multiply to 6 and add to −5; this gives (x−2)(x−3).",why:["Correct — two numbers that multiply to 6 and add to −5 give the factorization (x−2)(x−3).","This would only be correct if the two roots were identical, but 2 and 3 are different numbers.","This mistakes the coefficients b and c for the roots themselves, rather than finding numbers that multiply to c and add to b.","The signs are wrong: with a positive constant term and a negative middle term, both factors must be negative, not positive."],strategy:"For x²+bx+c, look for two numbers that multiply to c and add to b, then check the signs."},
{id:"SAT-B1M-ADV-02",calculatorAllowed:true,section:"Math",skill:"Advanced Math",difficulty:"Medium",q:"Which expression is equivalent to x² − 6x + 8?",choices:["(x+4)(x+2)","(x−4)²","(x−6)(x−8)","(x−4)(x−2)"],a:3,ex:"Find two numbers that multiply to 8 and add to −6; this gives (x−2)(x−4).",why:["The signs are wrong: both factors must be negative here, not positive.","This would only be correct if the two roots were identical, but 2 and 4 are different numbers.","This mistakes the coefficients b and c for the roots themselves, rather than finding numbers that multiply to c and add to b.","Correct — two numbers that multiply to 8 and add to −6 give the factorization (x−2)(x−4)."],strategy:"For x²+bx+c, look for two numbers that multiply to c and add to b, then check the signs."},
{id:"SAT-B1M-ADV-03",calculatorAllowed:true,section:"Math",skill:"Advanced Math",difficulty:"Easy",q:"If f(x) = 2^x, what is f(3)?",choices:["11","4","8","16"],a:2,ex:"f(3) = 2^3 = 8.",why:["This adds the base and exponent instead of raising the base to that power.","This is the value of the base itself, not the base raised to the given power.","Correct — 2^3 = 8.","This is one power too high — it corresponds to the next exponent, not this one."],strategy:"Substitute the input value for x and evaluate the power directly — don't just multiply the base by the exponent."},
{id:"SAT-B1M-ADV-04",calculatorAllowed:true,section:"Math",skill:"Advanced Math",difficulty:"Easy",q:"If f(x) = 5^x, what is f(3)?",choices:["625","128","25","125"],a:3,ex:"f(3) = 5^3 = 125.",why:["This is one power too high — it corresponds to the next exponent, not this one.","This resembles a power of 2 rather than a power of 5.","This is the base squared, not the base raised to the given power.","Correct — 5^3 = 125."],strategy:"Substitute the input value for x and evaluate the power directly — don't just multiply the base by the exponent."},
{id:"SAT-B1M-ADV-05",calculatorAllowed:true,section:"Math",skill:"Advanced Math",difficulty:"Medium",q:"If f(x) = 5(x − 0)² + 9, what is f(4)?",choices:["80","89","94","16"],a:1,ex:"Substitute x=4: f(4) = 5(4−0)² + 9 = 89.",why:["This omits the constant term k at the end of the calculation.","Correct — f(4) = 5(4−0)² + 9 = 5×16 + 9 = 89.","This adds 5 to the correct value instead of computing (x−h)² first.","This is 5×4², forgetting to subtract h before squaring."],strategy:"Work inside the parentheses first, then square, then multiply by the leading coefficient, then add the constant last."},
{id:"SAT-B1M-ADV-06",calculatorAllowed:true,section:"Math",skill:"Advanced Math",difficulty:"Medium",q:"If f(x) = 2(x − 1)² + 5, what is f(3)?",choices:["15","4","13","8"],a:2,ex:"Substitute x=3: f(3) = 2(3−1)² + 5 = 13.",why:["This adds 2 extra instead of following order of operations.","This squares (x−h) but forgets to multiply by the leading coefficient.","Correct — f(3) = 2(3−1)² + 5 = 2×4 + 5 = 13.","This omits the constant term k at the end of the calculation."],strategy:"Work inside the parentheses first, then square, then multiply by the leading coefficient, then add the constant last."},
{id:"SAT-B1M-GT-01",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Easy",q:"A right triangle has legs 3 and 4. What is the hypotenuse?",choices:["5","12","7","1"],a:0,ex:"By the Pythagorean theorem, c² = 3²+4² = 25, so c = 5.",why:["Correct — by the Pythagorean theorem, c² = 3²+4² = 9+16 = 25, so c = 5.","This adds the two legs directly instead of using the Pythagorean theorem.","This adds the legs rather than the squares of the legs.","This is far too small to be the longest side of the triangle."],strategy:"Apply a²+b²=c², then take the square root of the sum — don't just add the legs."},
{id:"SAT-B1M-GT-02",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Easy",q:"A right triangle has legs 8 and 15. What is the hypotenuse?",choices:["17","7","120","23"],a:0,ex:"By the Pythagorean theorem, c² = 8²+15² = 289, so c = 17.",why:["Correct — by the Pythagorean theorem, c² = 8²+15² = 64+225 = 289, so c = 17.","This is the difference of the two legs, not the hypotenuse.","This is the product of the two legs (used for area), not the hypotenuse.","This is the sum of the two legs, which is larger than the true hypotenuse."],strategy:"Apply a²+b²=c², then take the square root of the sum — don't just add the legs."},
{id:"SAT-B1M-GT-03",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Easy",q:"A right triangle has legs 6 and 8. What is the hypotenuse?",choices:["14","2","48","10"],a:3,ex:"By the Pythagorean theorem, c² = 6²+8² = 100, so c = 10.",why:["This is the sum of the two legs, not the hypotenuse.","This is the difference of the two legs, not the hypotenuse.","This is the product of the two legs (used for area), not the hypotenuse.","Correct — by the Pythagorean theorem, c² = 6²+8² = 36+64 = 100, so c = 10."],strategy:"Apply a²+b²=c², then take the square root of the sum — don't just add the legs."},
{id:"SAT-B1M-GT-04",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"In a right triangle, relative to angle θ, the opposite side is 8 and the adjacent side is 15. What is tan θ?",choices:["8/17","15/17","15/8","8/15"],a:3,ex:"tan θ = opposite/adjacent = 8/15.",why:["This uses the hypotenuse in the denominator, which is the sine ratio, not tangent.","This uses the hypotenuse in the numerator, which doesn't match any basic trig ratio for this triangle.","This inverts the ratio, giving adjacent over opposite instead of opposite over adjacent.","Correct — tan θ = opposite/adjacent = 8/15."],strategy:"Remember tan θ = opposite/adjacent — sine and cosine are the ratios that involve the hypotenuse."},
{id:"SAT-B1M-GT-05",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"In a right triangle, relative to angle θ, the opposite side is 3 and the adjacent side is 4. What is tan θ?",choices:["4/5","3/4","4/3","3/5"],a:1,ex:"tan θ = opposite/adjacent = 3/4.",why:["This uses the hypotenuse, which makes it a sine ratio, not tangent.","Correct — tan θ = opposite/adjacent = 3/4.","This inverts the ratio, giving adjacent over opposite instead of opposite over adjacent.","This uses the hypotenuse, which makes it a cosine ratio, not tangent."],strategy:"Remember tan θ = opposite/adjacent — sine and cosine are the ratios that involve the hypotenuse."},
{id:"SAT-B1M-GT-06",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"In a right triangle, relative to angle θ, the opposite side is 5 and the adjacent side is 12. What is tan θ?",choices:["5/13","12/13","12/5","5/12"],a:3,ex:"tan θ = opposite/adjacent = 5/12.",why:["This uses the hypotenuse in the denominator, which is the sine ratio, not tangent.","This uses the hypotenuse in the numerator, which doesn't match any basic trig ratio for this triangle.","This inverts the ratio, giving adjacent over opposite instead of opposite over adjacent.","Correct — tan θ = opposite/adjacent = 5/12."],strategy:"Remember tan θ = opposite/adjacent — sine and cosine are the ratios that involve the hypotenuse."},
{id:"SAT-B1M-PSDA-01",calculatorAllowed:true,section:"Math",skill:"Problem-Solving & Data Analysis",difficulty:"Easy",q:"The five values are 24, 20, 18, 23, 25. What is their mean?",choices:["24","22","20","110"],a:1,ex:"Mean = sum ÷ count = 110 ÷ 5 = 22.",why:["This is close to but not exactly the correct sum divided by 5 — double-check the addition.","Correct — the sum of the values is 110, and 110÷5 = 22.","This is the sum of all five values, not the sum divided by the count.","This is one of the individual values in the list, not the mean of all five."],strategy:"Add all the values first, then divide by how many values there are — don't stop at the sum."},
{id:"SAT-B1M-PSDA-02",calculatorAllowed:true,section:"Math",skill:"Problem-Solving & Data Analysis",difficulty:"Easy",q:"The five values are 5, 13, 25, 5, 12. What is their mean?",choices:["12","10","60","14"],a:0,ex:"Mean = sum ÷ count = 60 ÷ 5 = 12.",why:["Correct — the sum of the values is 60, and 60÷5 = 12.","This is close to but not exactly the correct sum divided by 5 — double-check the addition.","This is the sum of all five values, not the sum divided by the count.","This is one of the individual values in the list, not the mean of all five."],strategy:"Add all the values first, then divide by how many values there are — don't stop at the sum."},
{id:"SAT-B1M-PSDA-03",calculatorAllowed:true,section:"Math",skill:"Problem-Solving & Data Analysis",difficulty:"Easy",q:"The five values are 6, 5, 19, 23, 12. What is their mean?",choices:["65","15","11","13"],a:3,ex:"Mean = sum ÷ count = 65 ÷ 5 = 13.",why:["This is close to but not exactly the correct sum divided by 5 — double-check the addition.","This is the sum of all five values, not the sum divided by the count.","This is one of the individual values in the list, not the mean of all five.","Correct — the sum of the values is 65, and 65÷5 = 13."],strategy:"Add all the values first, then divide by how many values there are — don't stop at the sum."},
{id:"SAT-B1M-PSDA-04",calculatorAllowed:true,section:"Math",skill:"Problem-Solving & Data Analysis",difficulty:"Easy",q:"A car travels at 45 miles per hour for 4 hours. How many miles does it travel?",choices:["225","176","49","180"],a:3,ex:"Distance = rate × time = 45 × 4 = 180 miles.",why:["This is close to the correct product but not exact — recheck the multiplication.","This adds the rate and time instead of multiplying them.","This is roughly the sum of rate and time, not their product.","Correct — distance = rate × time = 45 × 4 = 180 miles."],strategy:"Use distance = rate × time, keeping the units (miles per hour, hours) consistent."},
{id:"SAT-B1M-PSDA-05",calculatorAllowed:true,section:"Math",skill:"Problem-Solving & Data Analysis",difficulty:"Easy",q:"A car travels at 60 miles per hour for 4 hours. How many miles does it travel?",choices:["300","236","64","240"],a:3,ex:"Distance = rate × time = 60 × 4 = 240 miles.",why:["This is close to but not exactly the correct product — recheck the multiplication.","This is close to the sum of rate and time, not their product.","This is the sum of the rate and time, not their product.","Correct — distance = rate × time = 60 × 4 = 240 miles."],strategy:"Use distance = rate × time, keeping the units (miles per hour, hours) consistent."},
{id:"SAT-B1M-PSDA-06",calculatorAllowed:true,section:"Math",skill:"Problem-Solving & Data Analysis",difficulty:"Easy",q:"A car travels at 65 miles per hour for 2 hours. How many miles does it travel?",choices:["128","130","195","67"],a:1,ex:"Distance = rate × time = 65 × 2 = 130 miles.",why:["This is close to but not exactly the correct product — recheck the multiplication.","Correct — distance = rate × time = 65 × 2 = 130 miles.","This is 3 times the rate instead of 2 times the rate.","This is the sum of the rate and time, not their product."],strategy:"Use distance = rate × time, keeping the units (miles per hour, hours) consistent."},
{id:"SAT-B2M-GEO-01",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"A circle in the xy-plane is defined by the equation (x - 5)² + (y + 2)² = 4. What is the exact area of this circle?",choices:["4π","2π","8π","16π"],a:0,ex:"In (x−h)²+(y−k)²=r² form, the right-hand side is already r². Here r²=4, so area=πr²=4π — no need to take a square root first.",why:["Correct — comparing to the standard form (x−h)²+(y−k)²=r², r² = 4 directly, so the area is πr² = 4π.","This equals r (the radius, 2), not r²; the area needs r² = 4, not r.","This is 2r (twice the radius), which resembles a diameter or circumference calculation, not the area formula πr².","This doubles the correct area; area is πr² = 4π, not 2×4π."],strategy:"Don't confuse the standard circle equation's right-hand side (r²) with the radius itself — for area you can use r² directly without solving for r."},
{id:"SAT-B2M-GEO-02",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"A circle in the xy-plane is defined by the equation (x + 3)² + (y - 1)² = 25. What is the exact area of this circle?",choices:["5π","25π","10π","50π"],a:1,ex:"In (x−h)²+(y−k)²=r² form, the right-hand side is already r². Here r²=25, so area=πr²=25π — no need to take a square root first.",why:["This equals r (the radius, 5), not r²; the area needs r² = 25, not r.","Correct — comparing to the standard form (x−h)²+(y−k)²=r², r² = 25 directly, so the area is πr² = 25π.","This is 2r (twice the radius), which resembles a diameter or circumference calculation, not the area formula πr².","This doubles the correct area; area is πr² = 25π, not 2×25π."],strategy:"Don't confuse the standard circle equation's right-hand side (r²) with the radius itself — for area you can use r² directly without solving for r."},
{id:"SAT-B2M-GEO-03",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"A circle in the xy-plane is defined by the equation (x - 2)² + (y - 2)² = 49. What is the exact area of this circle?",choices:["7π","14π","49π","98π"],a:2,ex:"In (x−h)²+(y−k)²=r² form, the right-hand side is already r². Here r²=49, so area=πr²=49π — no need to take a square root first.",why:["This equals r (the radius, 7), not r²; the area needs r² = 49, not r.","This is 2r (twice the radius), which resembles a diameter or circumference calculation, not the area formula πr².","Correct — comparing to the standard form (x−h)²+(y−k)²=r², r² = 49 directly, so the area is πr² = 49π.","This doubles the correct area; area is πr² = 49π, not 2×49π."],strategy:"Don't confuse the standard circle equation's right-hand side (r²) with the radius itself — for area you can use r² directly without solving for r."},
{id:"SAT-B2M-GEO-04",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"A circle in the xy-plane is defined by the equation (x + 1)² + (y + 4)² = 81. What is the exact area of this circle?",choices:["9π","18π","162π","81π"],a:3,ex:"In (x−h)²+(y−k)²=r² form, the right-hand side is already r². Here r²=81, so area=πr²=81π — no need to take a square root first.",why:["This equals r (the radius, 9), not r²; the area needs r² = 81, not r.","This is 2r (twice the radius), which resembles a diameter or circumference calculation, not the area formula πr².","This doubles the correct area; area is πr² = 81π, not 2×81π.","Correct — comparing to the standard form (x−h)²+(y−k)²=r², r² = 81 directly, so the area is πr² = 81π."],strategy:"Don't confuse the standard circle equation's right-hand side (r²) with the radius itself — for area you can use r² directly without solving for r."},
{id:"SAT-B2M-GEO-05",calculatorAllowed:true,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",q:"A circle in the xy-plane is defined by the equation (x - 6)² + (y + 3)² = 64. What is the exact area of this circle?",choices:["64π","8π","16π","128π"],a:0,ex:"In (x−h)²+(y−k)²=r² form, the right-hand side is already r². Here r²=64, so area=πr²=64π — no need to take a square root first.",why:["Correct — comparing to the standard form (x−h)²+(y−k)²=r², r² = 64 directly, so the area is πr² = 64π.","This equals r (the radius, 8), not r²; the area needs r² = 64, not r.","This is 2r (twice the radius), which resembles a diameter or circumference calculation, not the area formula πr².","This doubles the correct area; area is πr² = 64π, not 2×64π."],strategy:"Don't confuse the standard circle equation's right-hand side (r²) with the radius itself — for area you can use r² directly without solving for r."}
];

const ACT_QUESTIONS = [
{id:"ACT-ENG-0001",section:"English",skill:"Grammar & Usage",difficulty:"Easy",q:"Choose the best revision: “Each of the players have a locker.”",choices:["Each of the players have a locker.","Each of the players has a locker.","Each of the players having a locker.","Each of the players were having a locker."],a:1,ex:"The subject 'Each' is singular, so the singular verb 'has' is required.",why:["Have does not agree with singular Each.","Has is correct.","Having does not form a complete predicate.","Were having is plural and awkward."],strategy:"Agreement follows the grammatical subject, not the nearest plural noun."},
{id:"ACT-ENG-0002",section:"English",skill:"Punctuation",difficulty:"Medium",q:"Which sentence is punctuated correctly?",choices:["Before the concert began the audience became quiet.","Before the concert began, the audience became quiet.","Before, the concert began the audience became quiet.","Before the concert, began the audience became quiet."],a:1,ex:"The introductory dependent clause is followed by a comma.",why:["A comma is needed after the introductory clause.","This is correct.","The comma is misplaced.","The comma incorrectly separates subject and verb."],strategy:"Use a comma after a longer introductory clause before the independent clause."},
{id:"ACT-ENG-0003",section:"English",skill:"Organization & Rhetoric",difficulty:"Hard",passage:"(1) The robotics team designed a lightweight frame. (2) They tested several wheel sizes. (3) The school cafeteria serves lunch at noon. (4) After testing, the team selected larger wheels for better traction.",q:"Which sentence should be deleted because it is irrelevant?",choices:["Sentence 1","Sentence 2","Sentence 3","Sentence 4"],a:2,ex:"Sentence 3 is unrelated to the robotics team's design and testing process.",why:["Sentence 1 establishes the design task.","Sentence 2 describes testing.","Sentence 3 is unrelated.","Sentence 4 reports the testing result."],strategy:"A relevant sentence must support the paragraph's main purpose."},
{id:"ACT-MATH-0001",calculatorAllowed:true,section:"Math",skill:"Algebra",difficulty:"Easy",q:"If 3x + 4 = 19, what is x?",choices:["3","5","7","15"],a:1,ex:"Subtract 4: 3x=15. Divide by 3: x=5.",why:["3 gives 13.","5 is correct.","7 gives 25.","15 is 3x before division."],strategy:"Use inverse operations in reverse order."},
{id:"ACT-MATH-0002",calculatorAllowed:true,section:"Math",skill:"Geometry",difficulty:"Medium",q:"A triangle has base 10 and height 6. What is its area?",choices:["16","30","60","120"],a:1,ex:"Triangle area = 1/2 × base × height = 1/2×10×6=30.",why:["16 is unrelated.","30 is correct.","60 omits the one-half factor.","120 doubles incorrectly."],strategy:"Remember the one-half factor in the triangle area formula."},
{id:"ACT-MATH-0003",calculatorAllowed:true,section:"Math",skill:"Functions",difficulty:"Hard",q:"If f(x)=2x²−1, what is f(3)?",choices:["11","17","18","35"],a:1,ex:"Substitute 3: f(3)=2(3²)−1=18−1=17.",why:["11 comes from incorrect squaring.","17 is correct.","18 forgets the −1.","35 is not produced by the function."],strategy:"Substitute first, then follow order of operations."},
{id:"ACT-READ-0001",section:"Reading",skill:"Main Idea",difficulty:"Easy",passage:"For decades, the old railway station stood unused. A local nonprofit later restored the building, converting its waiting room into a public reading space and its ticket office into a small museum about the town's transportation history.",q:"What is the main idea?",choices:["The station was demolished.","An unused station was restored for community use.","The town built a new airport.","The museum focuses on agriculture."],a:1,ex:"The passage centers on the restoration and new community uses of the old station.",why:["The station was restored, not demolished.","This captures the passage.","No airport is mentioned.","The museum concerns transportation."],strategy:"State what the entire passage is mainly about."},
{id:"ACT-READ-0002",section:"Reading",skill:"Inference",difficulty:"Medium",passage:"Jordan checked the weather forecast, packed a lightweight rain jacket, and moved the outdoor equipment beneath the covered patio before leaving for work.",q:"It can reasonably be inferred that Jordan expects:",choices:["snow","rain","extreme heat only","a power outage"],a:1,ex:"The rain jacket and moving equipment under cover strongly suggest expected rain.",why:["No snow clues appear.","Rain is supported by multiple details.","Heat is not the main concern indicated.","A power outage is unsupported."],strategy:"Use several concrete details to support an inference."},
{id:"ACT-SCI-0001",section:"Science (Optional)",skill:"Data Interpretation",difficulty:"Medium",passage:"A plant experiment measured average height after four weeks. Group A received 4 hours of light per day and averaged 12 cm. Group B received 8 hours and averaged 18 cm. Group C received 12 hours and averaged 19 cm.",q:"Which conclusion is best supported by the data?",choices:["Increasing light from 4 to 8 hours was associated with a 6 cm increase in average height.","Group C was twice as tall as Group A.","More light always causes unlimited growth.","Group B received less light than Group A."],a:0,ex:"Average height increased from 12 cm to 18 cm, a difference of 6 cm, when light increased from 4 to 8 hours.",why:["This directly matches the data.","19 is not twice 12.","The data do not support unlimited growth.","Group B received more light."],strategy:"Choose only conclusions directly supported by the reported measurements."},
{id:"ACT-SCI-0002",section:"Science (Optional)",skill:"Experimental Design",difficulty:"Hard",passage:"Students test whether fertilizer affects bean-plant growth. They give one group fertilizer and another group no fertilizer. Both groups receive the same soil type, amount of water, container size, and light.",q:"Why are the soil, water, container size, and light kept the same?",choices:["To make fertilizer the main variable being tested","To guarantee every plant grows to the same height","To increase the number of variables","To prevent any measurements from being taken"],a:0,ex:"Keeping other conditions constant helps isolate the effect of fertilizer, the independent variable.",why:["This is the purpose of controlled variables.","Equal conditions do not guarantee equal height.","Good experiments reduce uncontrolled variables.","Measurements are still required."],strategy:"Controlled variables help isolate the effect of the independent variable."}
];


/* Per-session question and answer-choice randomization */
function secureRandom(){
 try{
  const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296;
 }catch(e){return Math.random()}
}
function secureShuffle(arr){
 const a=[...arr];
 for(let i=a.length-1;i>0;i--){
  const j=Math.floor(secureRandom()*(i+1));
  [a[i],a[j]]=[a[j],a[i]];
 }
 return a;
}
function randomizedQuestion(q){
 const pairs=q.choices.map((choice,i)=>({choice,why:q.why?.[i]||"",correct:i===q.a}));
 const mixed=secureShuffle(pairs);
 return {...q,choices:mixed.map(x=>x.choice),why:mixed.map(x=>x.why),a:mixed.findIndex(x=>x.correct)};
}
function randomizedSet(arr){
 return secureShuffle(arr).map(randomizedQuestion);
}
function sessionCode(prefix){
 return prefix+"-"+Date.now().toString(36).slice(-5).toUpperCase()+"-"+Math.floor(secureRandom()*1296).toString(36).padStart(2,"0").toUpperCase();
}

const QUESTIONS = [
{id:"TSI-MATH-ALG-0001",exam:"TSI",section:"Mathematics",skill:"Algebraic Reasoning",difficulty:"Easy",q:"Solve for x: 4x + 7 = 31.",choices:["4","6","8","9"],a:1,ex:"Subtract 7 from both sides to get 4x = 24. Divide both sides by 4, so x = 6.",why:["4 would make 4x + 7 equal 23, not 31.","6 satisfies the equation because 4(6)+7=31.","8 makes the left side 39.","9 makes the left side 43."],strategy:"Undo addition or subtraction first, then undo multiplication or division."},
{id:"TSI-MATH-ALG-0002",calculatorAllowed:true,exam:"TSI",section:"Mathematics",skill:"Algebraic Reasoning",difficulty:"Medium",q:"A phone plan charges a $25 monthly fee plus $8 for each gigabyte of data used beyond the included amount. If the bill is $73, how many extra gigabytes were used?",choices:["4","5","6","8"],a:2,ex:"Subtract the monthly fee: 73 − 25 = 48. Divide by $8 per gigabyte: 48 ÷ 8 = 6.",why:["4 extra GB would add only $32.","5 extra GB would add $40.","6 extra GB adds $48, giving a total of $73.","8 extra GB would add $64."],strategy:"Translate the situation into total = fixed fee + rate × quantity."},
{id:"TSI-MATH-ALG-0003",calculatorAllowed:true,exam:"TSI",section:"Mathematics",skill:"Algebraic Reasoning",difficulty:"Hard",q:"If 2x² − 5x − 3 = 0, which value is a solution?",choices:["3","2","-2","1/2"],a:0,ex:"Factor the quadratic: 2x² − 5x − 3 = (2x + 1)(x − 3). Thus x = −1/2 or x = 3. Among the choices, 3 is listed.",why:["3 makes both factors produce a zero product.","2 does not make the expression zero.","−2 does not make the expression zero.","1/2 is not the root; −1/2 is."],strategy:"Try factoring before using the quadratic formula when the coefficients are small integers."},
{id:"TSI-MATH-QUANT-0001",exam:"TSI",section:"Mathematics",skill:"Quantitative Reasoning",difficulty:"Easy",q:"A jacket originally costs $80 and is discounted by 25%. What is the sale price?",choices:["$20","$55","$60","$65"],a:2,ex:"Twenty-five percent of $80 is $20. Subtract the discount: $80 − $20 = $60.",why:["$20 is the amount of the discount, not the sale price.","$55 would represent a larger discount.","$60 is the correct sale price.","$65 corresponds to a smaller discount."],strategy:"Find the discount amount first, then subtract it from the original price."},
{id:"TSI-MATH-QUANT-0002",calculatorAllowed:true,exam:"TSI",section:"Mathematics",skill:"Quantitative Reasoning",difficulty:"Medium",q:"A recipe uses 3 cups of flour for 8 servings. At the same rate, how many cups of flour are needed for 20 servings?",choices:["6","7.5","8","9"],a:1,ex:"Use a proportion: 3/8 = x/20. Multiply: 8x = 60, so x = 7.5 cups.",why:["6 cups would serve 16 at the same rate.","7.5 cups maintains the original ratio.","8 cups is too much for the same proportion.","9 cups would serve 24 at the same rate."],strategy:"Set up equal ratios with matching units before cross-multiplying."},
{id:"TSI-MATH-GEO-0001",exam:"TSI",section:"Mathematics",skill:"Geometric & Spatial Reasoning",difficulty:"Easy",q:"A rectangle has length 12 units and width 7 units. What is its area?",choices:["19","38","72","84"],a:3,ex:"Area of a rectangle = length × width = 12 × 7 = 84 square units.",why:["19 is the sum of length and width.","38 is the perimeter.","72 is 12×6, not 12×7.","84 is the correct area."],strategy:"Identify whether the question asks for area or perimeter before choosing a formula."},
{id:"TSI-MATH-GEO-0002",calculatorAllowed:true,exam:"TSI",section:"Mathematics",skill:"Geometric & Spatial Reasoning",difficulty:"Medium",q:"A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",choices:["10","12","14","15"],a:0,ex:"Use the Pythagorean theorem: 6² + 8² = c². Then 36 + 64 = 100, so c = 10.",why:["10 is the positive square root of 100.","12 does not satisfy the theorem.","14 is the sum of 6 and 8, not the hypotenuse.","15 is too large for these legs."],strategy:"For right triangles, test a²+b²=c² with c as the hypotenuse."},
{id:"TSI-MATH-STAT-0001",exam:"TSI",section:"Mathematics",skill:"Probabilistic & Statistical Reasoning",difficulty:"Easy",q:"The values 4, 6, 8, 8, and 9 are recorded. What is the median?",choices:["6","7","8","9"],a:2,ex:"The data are already ordered. With five values, the median is the middle (third) value: 8.",why:["6 is below the middle position.","7 is not one of the middle data values.","8 is the third value and therefore the median.","9 is the maximum."],strategy:"Order the data first, then locate the middle position."},
{id:"TSI-MATH-STAT-0002",calculatorAllowed:true,exam:"TSI",section:"Mathematics",skill:"Probabilistic & Statistical Reasoning",difficulty:"Medium",q:"A bag contains 5 red, 3 blue, and 2 green marbles. One marble is chosen at random. What is the probability of choosing a blue marble?",choices:["3/5","3/10","1/3","2/10"],a:1,ex:"There are 10 marbles total. Three are blue, so the probability is 3/10.",why:["3/5 uses the number of red marbles incorrectly in the denominator.","3/10 correctly compares blue outcomes to all outcomes.","1/3 does not use the total number of marbles.","2/10 is the probability of green."],strategy:"Probability = favorable outcomes ÷ total possible outcomes."},
{id:"TSI-ELAR-READ-0001",exam:"TSI",section:"ELAR",skill:"Main Idea",difficulty:"Easy",passage:"Community gardens can transform unused city lots into productive spaces. In addition to providing fresh produce, they can create places where neighbors meet, share knowledge, and work together. Some gardens also offer workshops on nutrition and sustainable growing practices.",q:"Which choice best states the main idea of the passage?",choices:["Community gardens are difficult to maintain.","Community gardens can provide food and strengthen communities.","City lots should only be used for housing.","Nutrition workshops are the main purpose of every community garden."],a:1,ex:"The passage emphasizes several benefits of community gardens, including fresh produce, social connection, and learning opportunities.",why:["The passage does not focus on maintenance difficulty.","This choice captures both food production and community benefits.","The passage does not argue that lots should only be used for housing.","Workshops are mentioned as one possible benefit, not the sole purpose."],strategy:"Choose the answer that covers the whole passage, not just one detail."},
{id:"TSI-ELAR-READ-0002",exam:"TSI",section:"ELAR",skill:"Inference",difficulty:"Medium",passage:"Maya arrived at the library ten minutes before it opened. She checked the return slot twice, then looked through her backpack and pulled out a notebook filled with sticky notes. When the doors opened, she walked directly toward the research desks.",q:"What can most reasonably be inferred about Maya?",choices:["She is waiting to meet a friend for lunch.","She likely plans to work on a research task.","She has forgotten why she came to the library.","She works at the library."],a:1,ex:"Her early arrival, organized notebook, and direct movement toward research desks suggest that she intends to work on research.",why:["Nothing in the passage suggests lunch plans.","The details strongly support a research purpose.","Her behavior appears purposeful, not confused.","There is no evidence that she is an employee."],strategy:"Base an inference on multiple details from the passage, not on assumptions."},
{id:"TSI-ELAR-VOCAB-0001",exam:"TSI",section:"ELAR",skill:"Vocabulary in Context",difficulty:"Medium",passage:"Although the first proposal was rejected, the committee remained resolute and continued revising the plan until it gained approval.",q:"As used in the sentence, “resolute” most nearly means:",choices:["uncertain","determined","silent","confused"],a:1,ex:"The committee continued working despite rejection, so “resolute” means determined or firmly decided.",why:["Uncertain conflicts with the committee's persistence.","Determined matches the context.","Silent does not describe their persistence.","Confused is not supported by the sentence."],strategy:"Use nearby actions and contrast words to infer the meaning of an unfamiliar word."},
{id:"TSI-ELAR-GRAM-0001",exam:"TSI",section:"ELAR",skill:"Sentence Structure & Grammar",difficulty:"Easy",q:"Which sentence is grammatically correct?",choices:["The students was preparing for the exam.","The students were preparing for the exam.","The students is preparing for the exam.","The students be preparing for the exam."],a:1,ex:"The plural subject “students” agrees with the plural past-tense verb “were.”",why:["“Students was” has subject-verb disagreement.","“Students were” is correct.","“Students is” has subject-verb disagreement.","“Students be” is not standard in this sentence."],strategy:"Identify the subject first, then make sure the verb agrees in number."},
{id:"TSI-ELAR-GRAM-0002",exam:"TSI",section:"ELAR",skill:"Punctuation",difficulty:"Medium",q:"Which sentence uses punctuation correctly?",choices:["After the meeting we went home.","After the meeting, we went home.","After, the meeting we went home.","After the meeting we, went home."],a:1,ex:"An introductory prepositional phrase such as “After the meeting” is appropriately followed by a comma here.",why:["The missing comma makes the introductory phrase less clearly separated.","This is the correctly punctuated sentence.","The comma incorrectly separates “After” from its object.","The comma incorrectly separates the subject from the verb phrase."],strategy:"Introductory phrases are often followed by a comma before the main clause."},
{id:"TSI-ELAR-REV-0001",exam:"TSI",section:"ELAR",skill:"Revision & Organization",difficulty:"Medium",passage:"(1) Lina wanted to reduce the amount of plastic she used each week. (2) She started carrying a reusable water bottle. (3) Many plastic bottles are sold in stores. (4) She also began bringing reusable bags when shopping.",q:"Which sentence is least relevant to the paragraph's focus and should be deleted?",choices:["Sentence 1","Sentence 2","Sentence 3","Sentence 4"],a:2,ex:"Sentence 3 gives a general fact about plastic bottles but does not directly describe Lina's actions to reduce plastic use.",why:["Sentence 1 introduces Lina's goal.","Sentence 2 gives one action supporting the goal.","Sentence 3 interrupts the focus on Lina's actions.","Sentence 4 gives another action supporting the goal."],strategy:"Delete a sentence when it does not support the paragraph's central focus or logical progression."},
{id:"TSI-ELAR-TRANS-0001",exam:"TSI",section:"ELAR",skill:"Transitions",difficulty:"Hard",q:"The first experiment produced inconsistent results. ______, the researchers adjusted the procedure and repeated the test.",choices:["For example","Therefore","Meanwhile","Similarly"],a:1,ex:"The second sentence describes an action taken as a result of the first experiment's problem, so “Therefore” best expresses cause and effect.",why:["“For example” introduces an illustration, not a consequence.","“Therefore” correctly signals a result.","“Meanwhile” signals simultaneous events.","“Similarly” signals comparison."],strategy:"Identify the logical relationship between sentences before selecting a transition."},
{id:"TSI-ELAR-READ-0003",exam:"TSI",section:"ELAR",skill:"Author's Purpose",difficulty:"Hard",passage:"Some cities have introduced dedicated bus lanes to reduce delays in public transportation. Supporters argue that buses carrying dozens of passengers should not be trapped in the same congestion as single-occupancy cars. Critics, however, worry that removing a lane from general traffic can increase delays for drivers.",q:"What is the author's primary purpose?",choices:["To prove dedicated bus lanes always reduce traffic","To present differing perspectives on dedicated bus lanes","To argue that cars should be banned from city centers","To explain how buses are manufactured"],a:1,ex:"The author summarizes both supporters' and critics' views without clearly endorsing either side.",why:["The passage does not claim bus lanes always reduce traffic.","The passage presents two competing perspectives.","The passage does not call for banning cars.","Bus manufacturing is unrelated."],strategy:"Look for whether the author mainly informs, argues, compares, or explains a process."},
{id:"TSI-ELAR-EDIT-0001",exam:"TSI",section:"ELAR",skill:"Usage & Editing",difficulty:"Hard",q:"Choose the best revision: “Neither the teacher nor the students was aware that the schedule had changed.”",choices:["Neither the teacher nor the students were aware that the schedule had changed.","Neither the teacher or the students were aware that the schedule had changed.","Neither the teacher nor the students is aware that the schedule had changed.","Neither the teacher nor the students be aware that the schedule had changed."],a:0,ex:"With “neither...nor,” the verb generally agrees with the subject closer to it. The nearer subject is the plural “students,” so “were” is appropriate.",why:["This revision correctly uses “neither...nor” and plural “were.”","“Neither...or” is not the standard correlative pair.","“Students is” does not agree.","“Be aware” is not correctly inflected here."],strategy:"With correlative pairs such as neither/nor, check agreement with the nearer subject."}
];

let store=JSON.parse(localStorage.getItem("scorepathTSI")||'{"answered":0,"correct":0,"mistakes":[],"bookmarks":[],"history":[],"essay":""}');
let state={set:[],i:0,answers:{},confidence:{},flags:[],timed:false,start:0,seconds:0,timerId:null,mode:"",submitted:{}};

const $=id=>document.getElementById(id);
function save(){localStorage.setItem("scorepathTSI",JSON.stringify(store));updateDash()}
function updateDash(){
 $("statAnswered").textContent=store.answered||0;
 $("statAccuracy").textContent=store.answered?Math.round(store.correct/store.answered*100)+"%":"—";
 $("statMistakes").textContent=(store.mistakes||[]).length;
 $("statSaved").textContent=(store.bookmarks||[]).length;
 const pct=Math.min(100,Math.round((store.answered||0)/50*100));
 $("progressRing").style.setProperty("--progress",pct+"%");$("ringText").textContent=pct+"%";
}
function hideAll(){
 $("practiceShell").classList.remove("show");$("results").classList.remove("show");$("essayLab").classList.remove("show");$("listPanel").classList.remove("show");$("dashHome").classList.add("hidden");
}
function showDash(){clearInterval(state.timerId);hideAll();$("dashHome").classList.remove("hidden");document.querySelectorAll(".sideItem").forEach(x=>x.classList.remove("active"));document.querySelector('[data-panel="home"]').classList.add("active");updateDash()}
function shuffled(arr){return secureShuffle(arr)}
function selectSet(mode){
 if(mode==="math")return randomizedSet(shuffled(QUESTIONS.filter(q=>q.section==="Mathematics")).slice(0,10));
 if(mode==="elar")return randomizedSet(shuffled(QUESTIONS.filter(q=>q.section==="ELAR")).slice(0,10));
 if(mode==="diagnostic")return randomizedSet(shuffled(QUESTIONS).slice(0,12));
 if(mode==="timed")return randomizedSet(shuffled(QUESTIONS).slice(0,15));
 if(mode==="mistakes")return randomizedSet(store.mistakes.map(id=>QUESTIONS.find(q=>q.id===id)).filter(Boolean));
 if(mode==="bookmarks")return randomizedSet(store.bookmarks.map(id=>QUESTIONS.find(q=>q.id===id)).filter(Boolean));
 return [];
}
function startTest(mode){
 if(mode==="essay"){hideAll();$("essayLab").classList.add("show");$("essayText").value=store.essay||"";updateWords();location.hash="tsi-center";return}
 clearInterval(state.timerId);
 const set=selectSet(mode);
 if(!set.length){alert("There are no saved questions in this list yet.");showDash();return}
 state={set,i:0,answers:{},confidence:{},flags:[],timed:mode==="timed",start:Date.now(),seconds:mode==="timed"?30*60:0,timerId:null,mode,submitted:{},sessionCode:sessionCode("TSI")};
 hideAll();$("practiceShell").classList.add("show");$("results").classList.remove("show");
 $("testTitle").textContent=mode==="math"?"TSI Mathematics Practice":mode==="elar"?"TSI ELAR Practice":mode==="diagnostic"?"TSI Diagnostic Practice":mode==="timed"?"TSI Timed Simulation":"TSI Review Practice";
 $("modeLabel").textContent=state.timed?"Exam Simulation — answers hidden":"Practice Mode — explanations after submit";
 $("timer").textContent=state.timed?formatTime(state.seconds):"Untimed";
 if(state.timed){
  $("confidenceBox").classList.add("hidden");$("submitAnswerBtn").classList.add("hidden");
  state.timerId=setInterval(()=>{state.seconds--; $("timer").textContent=formatTime(state.seconds); if(state.seconds<=300)$("timer").classList.add("dangerTime"); if(state.seconds<=0){clearInterval(state.timerId);finishTest(true)}},1000)
 } else {$("confidenceBox").classList.remove("hidden");$("submitAnswerBtn").classList.remove("hidden");$("timer").classList.remove("dangerTime")}
 renderQ();location.hash="tsi-center";
}
function formatTime(sec){sec=Math.max(0,sec);return String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0")}
function renderQ(){
 const q=state.set[state.i]; if(!q)return;
 $("testSub").innerHTML=`Question ${state.i+1} of ${state.set.length} • ${q.id}<span class="sessionBadge">Randomized session ${state.sessionCode||""}</span>`;
 $("qmeta").innerHTML=`<span class="tag">${q.section}</span><span class="tag">${q.skill}</span><span class="tag difficulty ${q.difficulty.toLowerCase()}">${q.difficulty}</span><span class="sourceTag">Original Practice</span><span class="reviewTag">Reviewed</span>`;
 if(q.passage){$("passage").textContent=q.passage;$("passage").classList.remove("hidden")}else $("passage").classList.add("hidden");
 $("questionText").textContent=q.q;
 $("options").innerHTML=q.choices.map((c,idx)=>{
   let cls="option";
   const selected=state.answers[q.id]===idx;
   if(selected)cls+=" selected";
   if(!state.timed && state.submitted[q.id]){
     if(idx===q.a)cls+=" correct";
     if(selected && idx!==q.a)cls+=" wrong";
   }
   return `<button class="${cls}" data-opt="${idx}"><span class="letter">${String.fromCharCode(65+idx)}</span><span>${c}</span></button>`
 }).join("");
 document.querySelectorAll("[data-opt]").forEach(b=>b.onclick=()=>choose(+b.dataset.opt));
 document.querySelectorAll(".conf").forEach(b=>b.classList.toggle("active",state.confidence[q.id]===b.dataset.conf));
 $("flagBtn").textContent=state.flags.includes(q.id)?"⚑ Flagged":"⚑ Flag for Review";
 $("bookmarkBtn").textContent=store.bookmarks.includes(q.id)?"🔖 Saved":"🔖 Bookmark";
 $("prevBtn").disabled=state.i===0;
 $("nextBtn").classList.toggle("hidden",state.i===state.set.length-1);
 $("finishBtn").classList.toggle("hidden",state.i!==state.set.length-1);
 $("submitAnswerBtn").disabled=state.answers[q.id]===undefined || !!state.submitted[q.id];
 if(!state.timed && state.submitted[q.id])showExplanation(q);else{$("explanation").classList.remove("show");$("explanation").innerHTML=""}
 renderNav();
}
function choose(idx){const q=state.set[state.i]; if(!state.timed&&state.submitted[q.id])return; state.answers[q.id]=idx;renderQ()}
function submitAnswer(){
 const q=state.set[state.i];if(state.answers[q.id]===undefined)return;
 if(state.submitted[q.id])return;
 state.submitted[q.id]=true;store.answered++;const correct=state.answers[q.id]===q.a;if(correct)store.correct++;
 if(!correct&&!store.mistakes.includes(q.id))store.mistakes.push(q.id);
 if(correct)store.mistakes=store.mistakes.filter(id=>id!==q.id);
 save();renderQ()
}
function showExplanation(q){
 const correct=state.answers[q.id]===q.a;
 $("explanation").classList.add("show");
 $("explanation").innerHTML=`<div class="expHead ${correct?"good":"bad"}">${correct?"✓ Response recorded":"✕ Response needs review"}</div>
 <div class="expBody"><h4>Step-by-Step Explanation</h4><p>${q.ex}</p><h4>Choice Analysis</h4><ul>${q.why.map((w,i)=>`<li><b>${String.fromCharCode(65+i)}.</b> ${w}</li>`).join("")}</ul><div class="strategy"><b>Solution Strategy:</b> ${q.strategy}</div><div class="answerKeyBox"><b>Answer Key</b>${String.fromCharCode(65+q.a)}. ${q.choices[q.a]}</div></div>`;
}
function renderNav(){
 $("navigator").innerHTML=state.set.map((q,idx)=>`<button class="navq ${state.answers[q.id]!==undefined?"answered":""} ${idx===state.i?"current":""} ${state.flags.includes(q.id)?"flagged":""}" data-jump="${idx}">${idx+1}</button>`).join("");
 document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>{state.i=+b.dataset.jump;renderQ()})
}
function finishTest(auto=false){
 clearInterval(state.timerId);
 if(!auto && state.timed){
  const unanswered=state.set.filter(q=>state.answers[q.id]===undefined).length;
  if(unanswered && !confirm(`You still have ${unanswered} unanswered question(s). Submit anyway?`))return;
 }
 if(state.timed){
  state.set.forEach(q=>{
    if(state.answers[q.id]!==undefined){
      store.answered++; const correct=state.answers[q.id]===q.a;if(correct)store.correct++;
      if(!correct&&!store.mistakes.includes(q.id))store.mistakes.push(q.id);
      if(correct)store.mistakes=store.mistakes.filter(id=>id!==q.id);
    }
  });save()
 }
 const answered=state.set.filter(q=>state.answers[q.id]!==undefined);
 const correct=answered.filter(q=>state.answers[q.id]===q.a).length;
 const elapsed=state.timed?((state.duration||30*60)-state.seconds):Math.round((Date.now()-state.start)/1000);
 store.history.push({date:new Date().toISOString(),mode:state.mode,score:correct,total:state.set.length,time:elapsed});save();
 $("practiceShell").classList.remove("show");$("results").classList.add("show");
 $("resScore").textContent=`${correct}/${state.set.length}`;$("resAccuracy").textContent=state.set.length?Math.round(correct/state.set.length*100)+"%":"0%";$("resTime").textContent=formatTime(elapsed);$("resFlagged").textContent=state.flags.length;
 $("resultSubtitle").textContent=auto?"Time expired. Your simulation was submitted automatically.":"Review your performance and explanations below.";
 const skills={};state.set.forEach(q=>{if(!skills[q.skill])skills[q.skill]={c:0,t:0};skills[q.skill].t++;if(state.answers[q.id]===q.a)skills[q.skill].c++});
 $("skillResults").innerHTML=Object.entries(skills).map(([k,v])=>{const p=Math.round(v.c/v.t*100);return `<div class="skillRow"><div class="skillTop"><span>${k}</span><span>${p}%</span></div><div class="bar"><i style="width:${p}%"></i></div></div>`}).join("");
 $("reviewList").innerHTML=state.set.map(q=>{const ans=state.answers[q.id],ok=ans===q.a;return `<div class="reviewCard ${ok?"good":"bad"}"><b>${q.id} — ${ok?"Correct":"Needs Review"}</b><p><b>Your answer:</b> ${ans===undefined?"Unanswered":String.fromCharCode(65+ans)+". "+q.choices[ans]}<br><b>Explanation:</b> ${q.ex}<div class="answerKeyBox"><b>Answer Key</b>${String.fromCharCode(65+q.a)}. ${q.choices[q.a]}</div></p></div>`}).join("");
 location.hash="tsi-center";
 window.ScorePathV13?.renderGoal?.();
}
function showList(type){
 hideAll();$("listPanel").classList.add("show");const ids=type==="mistakes"?store.mistakes:store.bookmarks;
 $("listTitle").textContent=type==="mistakes"?"My Mistakes":"Saved Questions";
 $("listIntro").textContent=type==="mistakes"?"Incorrect questions stay here until you answer them correctly in practice.":"Questions you bookmarked for later review.";
 $("savedList").innerHTML=ids.length?ids.map(id=>{const q=QUESTIONS.find(x=>x.id===id);return q?`<div class="reviewCard"><b>${q.id} — ${q.skill}</b><p>${q.q}</p></div>`:""}).join(""):`<div class="reviewCard"><b>No questions here yet.</b><p>Complete practice sets or bookmark questions to build this list.</p></div>`;
 $("practiceSavedBtn").dataset.type=type;
}
function updateWords(){const txt=$("essayText").value.trim();$("wordCount").textContent=(txt?txt.split(/\s+/).length:0)+" words"}
$("menuBtn").onclick=()=>$("catnav").classList.toggle("open");
document.querySelectorAll(".catbtn").forEach(btn=>btn.onclick=()=>{if(innerWidth<=870){const w=btn.closest(".catwrap");document.querySelectorAll(".catwrap").forEach(x=>{if(x!==w)x.classList.remove("open")});w.classList.toggle("open")}
/* A later mobile-nav redesign (@media max-width:870px, see .mega{display:none!important}) unconditionally
   hides the hover/click flyout below 870px, which left these three header buttons doing nothing visible
   on any phone-width screen even though the .open toggle above still runs. Rather than fight that !important
   rule (and risk the older hamburger-era CSS it coexists with), make the tap itself useful on every width:
   jump straight to that exam's practice center, exactly like the "Choose an exam" buttons further down the
   page already do. */
const examKey=["tsi","sat","act"].find(c=>btn.classList.contains(c));
if(examKey&&typeof window.v10ShowCenter==="function")window.v10ShowCenter(examKey);
});
document.querySelectorAll("[data-start]").forEach(x=>x.onclick=()=>startTest(x.dataset.start));
document.querySelectorAll("[data-open]").forEach(x=>x.onclick=()=>setTimeout(()=>startTest(x.dataset.open),50));
document.querySelectorAll("[data-panel]").forEach(x=>x.onclick=()=>x.dataset.panel==="home"?showDash():showList(x.dataset.panel));
document.querySelectorAll(".conf").forEach(b=>b.onclick=()=>{const q=state.set[state.i];state.confidence[q.id]=b.dataset.conf;renderQ()});
$("submitAnswerBtn").onclick=submitAnswer;$("prevBtn").onclick=()=>{if(state.i>0){state.i--;renderQ()}};$("nextBtn").onclick=()=>{if(state.i<state.set.length-1){state.i++;renderQ()}};
$("finishBtn").onclick=()=>finishTest(false);
$("flagBtn").onclick=()=>{const q=state.set[state.i];state.flags=state.flags.includes(q.id)?state.flags.filter(x=>x!==q.id):[...state.flags,q.id];renderQ()};
$("bookmarkBtn").onclick=()=>{const q=state.set[state.i];store.bookmarks=store.bookmarks.includes(q.id)?store.bookmarks.filter(x=>x!==q.id):[...store.bookmarks,q.id];save();renderQ()};
$("reviewMistakesBtn").onclick=()=>startTest("mistakes");$("backDashBtn").onclick=showDash;$("closeEssay").onclick=showDash;$("closeList").onclick=showDash;
$("practiceSavedBtn").onclick=e=>startTest(e.currentTarget.dataset.type);
$("essayText").addEventListener("input",()=>{updateWords();store.essay=$("essayText").value;localStorage.setItem("scorepathTSI",JSON.stringify(store))});
$("saveEssay").onclick=()=>{store.essay=$("essayText").value;save();alert("Essay draft saved in this browser.")};
function safeClick(id,fn){const el=document.getElementById(id);if(el)el.onclick=fn}
safeClick("heroTimed",()=>setTimeout(()=>startTest("timed"),50));

const SAT_STORE_KEY="scorepathSAT", ACT_STORE_KEY="scorepathACT";
let satStore=JSON.parse(localStorage.getItem(SAT_STORE_KEY)||'{"answered":0,"correct":0,"mistakes":[],"bookmarks":[],"history":[]}');
let actStore=JSON.parse(localStorage.getItem(ACT_STORE_KEY)||'{"answered":0,"correct":0,"mistakes":[],"bookmarks":[],"history":[]}');
let satState={set:[],i:0,answers:{},confidence:{},flags:[],timed:false,start:0,seconds:0,timerId:null,mode:"",submitted:{},duration:0};
let actState={set:[],i:0,answers:{},confidence:{},flags:[],timed:false,start:0,seconds:0,timerId:null,mode:"",submitted:{},duration:0};

function saveSAT(){localStorage.setItem(SAT_STORE_KEY,JSON.stringify(satStore));updateSATDash()}
function saveACT(){localStorage.setItem(ACT_STORE_KEY,JSON.stringify(actStore));updateACTDash()}
function updateSATDash(){
 $("satAnswered").textContent=satStore.answered||0;$("satAccuracy").textContent=satStore.answered?Math.round(satStore.correct/satStore.answered*100)+"%":"—";$("satMistakes").textContent=satStore.mistakes.length;$("satSaved").textContent=satStore.bookmarks.length;
 const p=Math.min(100,Math.round((satStore.answered||0)/50*100));$("satProgressRing").style.setProperty("--progress",p+"%");$("satRingText").textContent=p+"%";
}
function updateACTDash(){
 $("actAnswered").textContent=actStore.answered||0;$("actAccuracy").textContent=actStore.answered?Math.round(actStore.correct/actStore.answered*100)+"%":"—";$("actMistakes").textContent=actStore.mistakes.length;$("actSaved").textContent=actStore.bookmarks.length;
 const p=Math.min(100,Math.round((actStore.answered||0)/50*100));$("actProgressRing").style.setProperty("--progress",p+"%");$("actRingText").textContent=p+"%";
}
function satHideAll(){$("satPracticeShell").classList.remove("show");$("satResults").classList.remove("show");$("satListPanel").classList.remove("show");$("satHome").classList.add("hidden")}
function actHideAll(){$("actPracticeShell").classList.remove("show");$("actResults").classList.remove("show");$("actListPanel").classList.remove("show");$("actHome").classList.add("hidden")}
function satDash(){clearInterval(satState.timerId);satHideAll();$("satHome").classList.remove("hidden");updateSATDash()}
function actDash(){clearInterval(actState.timerId);actHideAll();$("actHome").classList.remove("hidden");updateACTDash()}
function satSet(mode){
 if(mode==="sat-rw")return randomizedSet(shuffled(SAT_QUESTIONS.filter(q=>q.section==="Reading & Writing")).slice(0,8));
 if(mode==="sat-math")return randomizedSet(shuffled(SAT_QUESTIONS.filter(q=>q.section==="Math")).slice(0,8));
 if(mode==="sat-diagnostic")return randomizedSet(shuffled(SAT_QUESTIONS).slice(0,10));
 if(mode==="sat-timed-rw")return randomizedSet(shuffled(SAT_QUESTIONS.filter(q=>q.section==="Reading & Writing")).slice(0,8));
 if(mode==="sat-timed-math")return randomizedSet(shuffled(SAT_QUESTIONS.filter(q=>q.section==="Math")).slice(0,8));
 if(mode==="mistakes")return randomizedSet(satStore.mistakes.map(id=>SAT_QUESTIONS.find(q=>q.id===id)).filter(Boolean));
 if(mode==="bookmarks")return randomizedSet(satStore.bookmarks.map(id=>SAT_QUESTIONS.find(q=>q.id===id)).filter(Boolean));
 return [];
}
function actSet(mode){
 if(mode==="act-english")return randomizedSet(shuffled(ACT_QUESTIONS.filter(q=>q.section==="English")).slice(0,8));
 if(mode==="act-math")return randomizedSet(shuffled(ACT_QUESTIONS.filter(q=>q.section==="Math")).slice(0,8));
 if(mode==="act-reading")return randomizedSet(shuffled(ACT_QUESTIONS.filter(q=>q.section==="Reading")).slice(0,8));
 if(mode==="act-science")return randomizedSet(shuffled(ACT_QUESTIONS.filter(q=>q.section==="Science (Optional)")).slice(0,8));
 if(mode==="act-diagnostic"||mode==="act-timed")return randomizedSet(shuffled(ACT_QUESTIONS).slice(0,10));
 if(mode==="mistakes")return randomizedSet(actStore.mistakes.map(id=>ACT_QUESTIONS.find(q=>q.id===id)).filter(Boolean));
 if(mode==="bookmarks")return randomizedSet(actStore.bookmarks.map(id=>ACT_QUESTIONS.find(q=>q.id===id)).filter(Boolean));
 return [];
}
function startSAT(mode){
 clearInterval(satState.timerId);const set=satSet(mode);if(!set.length){alert("No questions are available in this list yet.");satDash();return}
 const timed=mode==="sat-timed-rw"||mode==="sat-timed-math";const duration=mode==="sat-timed-rw"?32*60:mode==="sat-timed-math"?35*60:0;
 satState={set,i:0,answers:{},confidence:{},flags:[],timed,start:Date.now(),seconds:duration,timerId:null,mode,submitted:{},duration,sessionCode:sessionCode("SAT")};
 satHideAll();$("satPracticeShell").classList.add("show");
 $("satTestTitle").textContent=mode.includes("math")?"Digital SAT Math":mode.includes("rw")?"Digital SAT Reading & Writing":mode==="sat-diagnostic"?"Digital SAT Diagnostic":"SAT Review";
 $("satModeLabel").textContent=timed?"Timed Module — answers hidden":"Practice Mode — explanations after submit";$("satTimer").textContent=timed?formatTime(duration):"Untimed";
 $("satConfidenceBox").classList.toggle("hidden",timed);$("satSubmitBtn").classList.toggle("hidden",timed);
 if(timed)satState.timerId=setInterval(()=>{satState.seconds--;$("satTimer").textContent=formatTime(satState.seconds);if(satState.seconds<=300)$("satTimer").classList.add("dangerTime");if(satState.seconds<=0){clearInterval(satState.timerId);finishSAT(true)}},1000);
 renderSAT();location.hash="sat-center";
}
function startACT(mode){
 clearInterval(actState.timerId);const set=actSet(mode);if(!set.length){alert("No questions are available in this list yet.");actDash();return}
 const timed=mode==="act-timed";const duration=timed?20*60:0;
 actState={set,i:0,answers:{},confidence:{},flags:[],timed,start:Date.now(),seconds:duration,timerId:null,mode,submitted:{},duration,sessionCode:sessionCode("ACT")};
 actHideAll();$("actPracticeShell").classList.add("show");
 const titles={"act-english":"ACT English Practice","act-math":"ACT Math Practice","act-reading":"ACT Reading Practice","act-science":"ACT Science Practice (Optional)","act-diagnostic":"ACT Diagnostic Practice","act-timed":"ACT Timed Mixed Practice"};
 $("actTestTitle").textContent=titles[mode]||"ACT Review";$("actModeLabel").textContent=timed?"Timed Practice — answers hidden":"Practice Mode — explanations after submit";$("actTimer").textContent=timed?formatTime(duration):"Untimed";
 $("actConfidenceBox").classList.toggle("hidden",timed);$("actSubmitBtn").classList.toggle("hidden",timed);
 if(timed)actState.timerId=setInterval(()=>{actState.seconds--;$("actTimer").textContent=formatTime(actState.seconds);if(actState.seconds<=300)$("actTimer").classList.add("dangerTime");if(actState.seconds<=0){clearInterval(actState.timerId);finishACT(true)}},1000);
 renderACT();location.hash="act-center";
}
function renderGeneric(state,prefix,store,saveFn,renderFn){
 const q=state.set[state.i];if(!q)return;
 $(prefix+"TestSub").innerHTML=`Question ${state.i+1} of ${state.set.length} • ${q.id}<span class="sessionBadge">Randomized session ${state.sessionCode||""}</span>`;
 $(prefix+"Qmeta").innerHTML=`<span class="tag">${q.section}</span><span class="tag">${q.skill}</span><span class="tag difficulty ${q.difficulty.toLowerCase()}">${q.difficulty}</span><span class="sourceTag">Original Practice</span><span class="reviewTag">Reviewed</span>`;
 if(q.passage){$(prefix+"Passage").textContent=q.passage;$(prefix+"Passage").classList.remove("hidden")}else $(prefix+"Passage").classList.add("hidden");
 $(prefix+"QuestionText").textContent=q.q;
 $(prefix+"Options").innerHTML=q.choices.map((c,i)=>{let cls="option";let sel=state.answers[q.id]===i;if(sel)cls+=" selected";if(!state.timed&&state.submitted[q.id]){if(i===q.a)cls+=" correct";if(sel&&i!==q.a)cls+=" wrong"}return `<button class="${cls}" data-${prefix.toLowerCase()}-opt="${i}"><span class="letter">${String.fromCharCode(65+i)}</span><span>${c}</span></button>`}).join("");
 document.querySelectorAll(`[data-${prefix.toLowerCase()}-opt]`).forEach(b=>b.onclick=()=>{if(!state.timed&&state.submitted[q.id])return;state.answers[q.id]=+b.dataset[prefix.toLowerCase()+"Opt"];renderFn()});
 document.querySelectorAll("."+prefix.toLowerCase()+"conf").forEach(b=>b.classList.toggle("active",state.confidence[q.id]===b.dataset[prefix.toLowerCase()+"Conf"]));
 $(prefix+"FlagBtn").textContent=state.flags.includes(q.id)?"⚑ Flagged":"⚑ Flag for Review";$(prefix+"BookmarkBtn").textContent=store.bookmarks.includes(q.id)?"🔖 Saved":"🔖 Bookmark";
 $(prefix+"PrevBtn").disabled=state.i===0;$(prefix+"NextBtn").classList.toggle("hidden",state.i===state.set.length-1);$(prefix+"FinishBtn").classList.toggle("hidden",state.i!==state.set.length-1);
 $(prefix+"SubmitBtn").disabled=state.answers[q.id]===undefined||!!state.submitted[q.id];
 if(!state.timed&&state.submitted[q.id]){
  const ok=state.answers[q.id]===q.a;$(prefix+"Explanation").classList.add("show");$(prefix+"Explanation").innerHTML=`<div class="expHead ${ok?"good":"bad"}">${ok?"✓ Response recorded":"✕ Response needs review"}</div><div class="expBody"><h4>Step-by-Step Explanation</h4><p>${q.ex}</p><h4>Choice Analysis</h4><ul>${q.why.map((w,i)=>`<li><b>${String.fromCharCode(65+i)}.</b> ${w}</li>`).join("")}</ul><div class="strategy"><b>Solution Strategy:</b> ${q.strategy}</div><div class="answerKeyBox"><b>Answer Key</b>${String.fromCharCode(65+q.a)}. ${q.choices[q.a]}</div></div>`;
 }else{$(prefix+"Explanation").classList.remove("show");$(prefix+"Explanation").innerHTML=""}
 $(prefix+"Navigator").innerHTML=state.set.map((x,i)=>`<button class="navq ${state.answers[x.id]!==undefined?"answered":""} ${i===state.i?"current":""} ${state.flags.includes(x.id)?"flagged":""}" data-${prefix.toLowerCase()}-jump="${i}">${i+1}</button>`).join("");
 document.querySelectorAll(`[data-${prefix.toLowerCase()}-jump]`).forEach(b=>b.onclick=()=>{state.i=+b.dataset[prefix.toLowerCase()+"Jump"];renderFn()});
}
function renderSAT(){renderGeneric(satState,"sat",satStore,saveSAT,renderSAT)}
function renderACT(){renderGeneric(actState,"act",actStore,saveACT,renderACT)}
function submitGeneric(state,store,saveFn,renderFn){
 const q=state.set[state.i];if(state.answers[q.id]===undefined||state.submitted[q.id])return;state.submitted[q.id]=true;store.answered++;const ok=state.answers[q.id]===q.a;if(ok)store.correct++;if(!ok&&!store.mistakes.includes(q.id))store.mistakes.push(q.id);if(ok)store.mistakes=store.mistakes.filter(x=>x!==q.id);saveFn();renderFn()
}
function finishGeneric(state,store,saveFn,prefix,auto){
 clearInterval(state.timerId);
 if(!auto&&state.timed){const u=state.set.filter(q=>state.answers[q.id]===undefined).length;if(u&&!confirm(`You still have ${u} unanswered question(s). Submit anyway?`))return}
 if(state.timed)state.set.forEach(q=>{if(state.answers[q.id]!==undefined){store.answered++;let ok=state.answers[q.id]===q.a;if(ok)store.correct++;if(!ok&&!store.mistakes.includes(q.id))store.mistakes.push(q.id);if(ok)store.mistakes=store.mistakes.filter(x=>x!==q.id)}});
 const answered=state.set.filter(q=>state.answers[q.id]!==undefined),correct=answered.filter(q=>state.answers[q.id]===q.a).length,elapsed=state.timed?(state.duration-state.seconds):Math.round((Date.now()-state.start)/1000);
 store.history.push({date:new Date().toISOString(),mode:state.mode,score:correct,total:state.set.length,time:elapsed});saveFn();
 $(prefix+"PracticeShell").classList.remove("show");$(prefix+"Results").classList.add("show");$(prefix+"ResScore").textContent=`${correct}/${state.set.length}`;$(prefix+"ResAccuracy").textContent=Math.round(correct/state.set.length*100)+"%";$(prefix+"ResTime").textContent=formatTime(elapsed);$(prefix+"ResFlagged").textContent=state.flags.length;
 $(prefix+"ResultSubtitle").textContent=auto?"Time expired. Your practice was submitted automatically.":"Review your performance and explanations below.";
 const skills={};state.set.forEach(q=>{if(!skills[q.skill])skills[q.skill]={c:0,t:0};skills[q.skill].t++;if(state.answers[q.id]===q.a)skills[q.skill].c++});
 $(prefix+"SkillResults").innerHTML=Object.entries(skills).map(([k,v])=>{let p=Math.round(v.c/v.t*100);return `<div class="skillRow"><div class="skillTop"><span>${k}</span><span>${p}%</span></div><div class="bar"><i style="width:${p}%"></i></div></div>`}).join("");
 $(prefix+"ReviewList").innerHTML=state.set.map(q=>{let a=state.answers[q.id],ok=a===q.a;return `<div class="reviewCard ${ok?"good":"bad"}"><b>${q.id} — ${ok?"Correct":"Needs Review"}</b><p><b>Your answer:</b> ${a===undefined?"Unanswered":String.fromCharCode(65+a)+". "+q.choices[a]}<br><b>Explanation:</b> ${q.ex}<div class="answerKeyBox"><b>Answer Key</b>${String.fromCharCode(65+q.a)}. ${q.choices[q.a]}</div></p></div>`}).join("");
 window.ScorePathV13?.renderGoal?.();
}
function finishSAT(auto=false){finishGeneric(satState,satStore,saveSAT,"sat",auto)}
function finishACT(auto=false){finishGeneric(actState,actStore,saveACT,"act",auto)}
function showSATList(type){satHideAll();$("satListPanel").classList.add("show");let ids=type==="mistakes"?satStore.mistakes:satStore.bookmarks;$("satListTitle").textContent=type==="mistakes"?"My SAT Mistakes":"Saved SAT Questions";$("satListIntro").textContent=type==="mistakes"?"Incorrect SAT questions stay here until you answer them correctly.":"SAT questions you bookmarked for later review.";$("satSavedList").innerHTML=ids.length?ids.map(id=>{let q=SAT_QUESTIONS.find(x=>x.id===id);return q?`<div class="reviewCard"><b>${q.id} — ${q.skill}</b><p>${q.q}</p></div>`:""}).join(""):`<div class="reviewCard"><b>No questions here yet.</b></div>`;$("satPracticeSavedBtn").dataset.type=type}
function showACTList(type){actHideAll();$("actListPanel").classList.add("show");let ids=type==="mistakes"?actStore.mistakes:actStore.bookmarks;$("actListTitle").textContent=type==="mistakes"?"My ACT Mistakes":"Saved ACT Questions";$("actListIntro").textContent=type==="mistakes"?"Incorrect ACT questions stay here until you answer them correctly.":"ACT questions you bookmarked for later review.";$("actSavedList").innerHTML=ids.length?ids.map(id=>{let q=ACT_QUESTIONS.find(x=>x.id===id);return q?`<div class="reviewCard"><b>${q.id} — ${q.skill}</b><p>${q.q}</p></div>`:""}).join(""):`<div class="reviewCard"><b>No questions here yet.</b></div>`;$("actPracticeSavedBtn").dataset.type=type}

document.querySelectorAll("[data-sat-start]").forEach(x=>x.onclick=()=>startSAT(x.dataset.satStart));document.querySelectorAll("[data-act-start]").forEach(x=>x.onclick=()=>startACT(x.dataset.actStart));
document.querySelectorAll("[data-sat-panel]").forEach(x=>x.onclick=()=>x.dataset.satPanel==="home"?satDash():showSATList(x.dataset.satPanel));document.querySelectorAll("[data-act-panel]").forEach(x=>x.onclick=()=>x.dataset.actPanel==="home"?actDash():showACTList(x.dataset.actPanel));
document.querySelectorAll(".satconf").forEach(b=>b.onclick=()=>{let q=satState.set[satState.i];satState.confidence[q.id]=b.dataset.satConf;renderSAT()});document.querySelectorAll(".actconf").forEach(b=>b.onclick=()=>{let q=actState.set[actState.i];actState.confidence[q.id]=b.dataset.actConf;renderACT()});
$("satSubmitBtn").onclick=()=>submitGeneric(satState,satStore,saveSAT,renderSAT);$("actSubmitBtn").onclick=()=>submitGeneric(actState,actStore,saveACT,renderACT);
$("satPrevBtn").onclick=()=>{if(satState.i>0){satState.i--;renderSAT()}};$("satNextBtn").onclick=()=>{if(satState.i<satState.set.length-1){satState.i++;renderSAT()}};$("satFinishBtn").onclick=()=>finishSAT(false);
$("actPrevBtn").onclick=()=>{if(actState.i>0){actState.i--;renderACT()}};$("actNextBtn").onclick=()=>{if(actState.i<actState.set.length-1){actState.i++;renderACT()}};$("actFinishBtn").onclick=()=>finishACT(false);
$("satFlagBtn").onclick=()=>{let q=satState.set[satState.i];satState.flags=satState.flags.includes(q.id)?satState.flags.filter(x=>x!==q.id):[...satState.flags,q.id];renderSAT()};$("actFlagBtn").onclick=()=>{let q=actState.set[actState.i];actState.flags=actState.flags.includes(q.id)?actState.flags.filter(x=>x!==q.id):[...actState.flags,q.id];renderACT()};
$("satBookmarkBtn").onclick=()=>{let q=satState.set[satState.i];satStore.bookmarks=satStore.bookmarks.includes(q.id)?satStore.bookmarks.filter(x=>x!==q.id):[...satStore.bookmarks,q.id];saveSAT();renderSAT()};$("actBookmarkBtn").onclick=()=>{let q=actState.set[actState.i];actStore.bookmarks=actStore.bookmarks.includes(q.id)?actStore.bookmarks.filter(x=>x!==q.id):[...actStore.bookmarks,q.id];saveACT();renderACT()};
$("satWeakBtn").onclick=()=>startSAT("mistakes");$("actWeakBtn").onclick=()=>startACT("mistakes");$("satBackBtn").onclick=satDash;$("actBackBtn").onclick=actDash;$("satCloseList").onclick=satDash;$("actCloseList").onclick=actDash;$("satPracticeSavedBtn").onclick=e=>startSAT(e.currentTarget.dataset.type);$("actPracticeSavedBtn").onclick=e=>startACT(e.currentTarget.dataset.type);

const MOTIVATION={strong:["Excellent work — your accuracy shows strong command of this set.","Great job — you handled this set with strong consistency.","Strong performance. Keep reviewing the reasoning so the skill stays reliable."],solid:["Nice progress — you are building a strong foundation.","Good work. Review the missed questions, then try another set.","You are moving in the right direction. Focused review can turn these misses into strengths."],building:["Keep building — every reviewed mistake is useful practice.","Good effort. Slow down on missed skills and focus on why each answer works.","Progress comes from careful review. Use your mistakes as your next study plan."],start:["This result is a starting point, not a judgment. Review one skill at a time.","Keep going — understanding the explanation matters more than getting everything right immediately.","Use this set to identify what to study next. Improvement comes from targeted repetition."]};
const SUPPORT=["Read the exact question before looking at the answer choices.","Eliminate choices you can prove are wrong before guessing.","If you are stuck, identify the skill being tested and write down what you know.","Accuracy first. Speed improves after the method becomes familiar.","A wrong answer is useful when you understand why it was wrong.","Flag uncertain questions and return with a fresh view.","Look for units, transition words, signs, and constraints before calculating.","After solving, check whether your answer actually answers what was asked."];
function motivationFor(p){const a=p>=85?MOTIVATION.strong:p>=70?MOTIVATION.solid:p>=50?MOTIVATION.building:MOTIVATION.start;return a[Math.floor(Math.random()*a.length)]}
function supportLine(){return SUPPORT[Math.floor(Math.random()*SUPPORT.length)]}
function toggleFullscreen(shellId,btnId){const shell=$(shellId);shell.classList.toggle("fullscreenMode");document.body.style.overflow=shell.classList.contains("fullscreenMode")?"hidden":"";$(btnId).textContent=shell.classList.contains("fullscreenMode")?"⤢":"⛶"}
function leavePractice(shellId,dashFn){const shell=$(shellId);if(shell.classList.contains("fullscreenMode")){shell.classList.remove("fullscreenMode");document.body.style.overflow=""}dashFn()}
function packSession(st){return {questions:st.set,ids:st.set.map(q=>q.id),i:st.i,answers:st.answers,confidence:st.confidence,flags:st.flags,timed:st.timed,mode:st.mode,submitted:st.submitted,seconds:st.seconds,duration:st.duration||0,sessionCode:st.sessionCode||"",savedAt:Date.now()}}
function persistSession(key,st){if(st.set&&st.set.length)localStorage.setItem(key,JSON.stringify(packSession(st)));updateResumeCards()}
function restoreSession(key,bank,target){const raw=localStorage.getItem(key);if(!raw)return false;try{const x=JSON.parse(raw),set=(x.questions&&x.questions.length)?x.questions:x.ids.map(id=>bank.find(q=>q.id===id)).filter(Boolean);if(!set.length)return false;Object.assign(target,{set,i:Math.min(x.i||0,set.length-1),answers:x.answers||{},confidence:x.confidence||{},flags:x.flags||[],timed:!!x.timed,mode:x.mode||"",submitted:x.submitted||{},seconds:x.seconds||0,duration:x.duration||0,sessionCode:x.sessionCode||sessionCode("R"),start:Date.now(),timerId:null});return true}catch(e){return false}}
function updateResumeCards(){[["scorepathTSISession","tsiResume","tsiResumeText"],["scorepathSATSession","satResume","satResumeText"],["scorepathACTSession","actResume","actResumeText"]].forEach(([k,c,t])=>{const card=$(c),raw=localStorage.getItem(k);if(!card)return;if(raw){try{const x=JSON.parse(raw);card.classList.add("show");$(t).textContent=`Saved ${x.mode||"practice"} • Question ${(x.i||0)+1} of ${(x.ids||[]).length}`;}catch(e){card.classList.remove("show")}}else card.classList.remove("show")})}
function resumeTSI(){if(!restoreSession("scorepathTSISession",QUESTIONS,state))return;hideAll();$("practiceShell").classList.add("show");$("testTitle").textContent="TSI — Resumed Practice";$("modeLabel").textContent=state.timed?"Resumed Timed Simulation":"Resumed Practice";$("confidenceBox").classList.toggle("hidden",state.timed);$("submitAnswerBtn").classList.toggle("hidden",state.timed);$("timer").textContent=state.timed?formatTime(state.seconds):"Untimed";if(state.timed&&state.seconds>0)state.timerId=setInterval(()=>{state.seconds--;$("timer").textContent=formatTime(state.seconds);persistSession("scorepathTSISession",state);if(state.seconds<=0){clearInterval(state.timerId);finishTest(true)}},1000);renderQ()}
function resumeSAT(){if(!restoreSession("scorepathSATSession",SAT_QUESTIONS,satState))return;satHideAll();$("satPracticeShell").classList.add("show");$("satTestTitle").textContent="Digital SAT — Resumed Practice";$("satModeLabel").textContent=satState.timed?"Resumed Timed Module":"Resumed Practice";$("satConfidenceBox").classList.toggle("hidden",satState.timed);$("satSubmitBtn").classList.toggle("hidden",satState.timed);$("satTimer").textContent=satState.timed?formatTime(satState.seconds):"Untimed";if(satState.timed&&satState.seconds>0)satState.timerId=setInterval(()=>{satState.seconds--;$("satTimer").textContent=formatTime(satState.seconds);persistSession("scorepathSATSession",satState);if(satState.seconds<=0){clearInterval(satState.timerId);finishSAT(true)}},1000);renderSAT()}
function resumeACT(){if(!restoreSession("scorepathACTSession",ACT_QUESTIONS,actState))return;actHideAll();$("actPracticeShell").classList.add("show");$("actTestTitle").textContent="ACT — Resumed Practice";$("actModeLabel").textContent=actState.timed?"Resumed Timed Practice":"Resumed Practice";$("actConfidenceBox").classList.toggle("hidden",actState.timed);$("actSubmitBtn").classList.toggle("hidden",actState.timed);$("actTimer").textContent=actState.timed?formatTime(actState.seconds):"Untimed";if(actState.timed&&actState.seconds>0)actState.timerId=setInterval(()=>{actState.seconds--;$("actTimer").textContent=formatTime(actState.seconds);persistSession("scorepathACTSession",actState);if(actState.seconds<=0){clearInterval(actState.timerId);finishACT(true)}},1000);renderACT()}
$("fullscreenBtn").onclick=()=>toggleFullscreen("practiceShell","fullscreenBtn");$("closePracticeBtn").onclick=()=>leavePractice("practiceShell",showDash);
$("satFullscreenBtn").onclick=()=>toggleFullscreen("satPracticeShell","satFullscreenBtn");$("satCloseBtn").onclick=()=>leavePractice("satPracticeShell",satDash);
$("actFullscreenBtn").onclick=()=>toggleFullscreen("actPracticeShell","actFullscreenBtn");$("actCloseBtn").onclick=()=>leavePractice("actPracticeShell",actDash);
$("tsiResumeBtn").onclick=resumeTSI;$("satResumeBtn").onclick=resumeSAT;$("actResumeBtn").onclick=resumeACT;
$("tsiDiscardBtn").onclick=()=>{localStorage.removeItem("scorepathTSISession");updateResumeCards()};$("satDiscardBtn").onclick=()=>{localStorage.removeItem("scorepathSATSession");updateResumeCards()};$("actDiscardBtn").onclick=()=>{localStorage.removeItem("scorepathACTSession");updateResumeCards()};
const originalRenderQ=renderQ;renderQ=function(){originalRenderQ();if(state.set.length){const q=state.set[state.i];$("encourage").innerHTML=state.submitted[q.id]?`<b>${state.answers[q.id]===q.a?"Nice work.":"Keep learning."}</b> ${supportLine()}`:`<b>Practice tip:</b> ${supportLine()}`;persistSession("scorepathTSISession",state)}};
const originalRenderSAT=renderSAT;renderSAT=function(){originalRenderSAT();if(satState.set.length){const q=satState.set[satState.i];$("satEncourage").innerHTML=satState.submitted[q.id]?`<b>${satState.answers[q.id]===q.a?"Nice work.":"Keep learning."}</b> ${supportLine()}`:`<b>Practice tip:</b> ${supportLine()}`;persistSession("scorepathSATSession",satState)}};
const originalRenderACT=renderACT;renderACT=function(){originalRenderACT();if(actState.set.length){const q=actState.set[actState.i];$("actEncourage").innerHTML=actState.submitted[q.id]?`<b>${actState.answers[q.id]===q.a?"Nice work.":"Keep learning."}</b> ${supportLine()}`:`<b>Practice tip:</b> ${supportLine()}`;persistSession("scorepathACTSession",actState)}};
const STATE_GUIDES={"Texas":{title:"Texas High School Graduation",body:"Texas students follow the graduation plan that applies to their cohort. The Foundation High School Program is the current core framework for students who entered Grade 9 beginning in 2014–15. Texas Education Agency materials explain that graduation plans in use require 22–26 course credits, depending on the applicable plan, and state assessment requirements can also apply.",source:"https://tea.texas.gov/student-readiness-and-high-school/high-school-graduation-requirements"},"California":{title:"California State Minimum Graduation Requirements",body:"California sets statewide minimum course requirements, including three courses in English, two in mathematics including Algebra I, two in science, and three in social studies. Local school districts may require additional coursework beyond the state minimum.",source:"https://www.cde.ca.gov/ci/gs/hs/hsgrmin.asp"},"Florida":{title:"Florida Graduation Requirements",body:"Florida standard diploma requirements are governed by state law and can vary by the cohort in which a student entered Grade 9. Students should check the Florida Department of Education's current graduation-requirements page and their district graduation plan for the exact course, assessment, GPA, and pathway requirements that apply.",source:"https://www.fldoe.org/schools/k-12-public-schools/sss/graduation-requirements/"}};
$("showStateBtn").onclick=()=>{const st=$("stateSelect").value;if(!st){$("stateResult").innerHTML="<h3>Select a state</h3><p>Choose your state above.</p>";return}const g=STATE_GUIDES[st];$("stateResult").innerHTML=g?`<span class="verifiedBadge">✓ Verified official-source summary</span><h3>${g.title}</h3><p>${g.body}</p><p><a class="smallbtn primary2" href="${g.source}" target="_blank" rel="noopener">Open Official State Source ↗</a></p>`:`<h3>${st} Graduation Guide</h3><p>Specific credit and assessment details for ${st} have not yet been published here because ScorePath Practice only displays them after official-source verification.</p><p>Check the state education agency and your local school district or counselor for the graduation plan that applies to your cohort.</p>`};
updateResumeCards();


/* ScorePath professional assessment enhancements */
const PACING={tsi:15*60,sat:15*60,act:15*60};
function modalOpen(id){const m=$(id);if(m){m.classList.add("show");m.setAttribute("aria-hidden","false")}}
function modalClose(id){const m=$(id);if(m){m.classList.remove("show");m.setAttribute("aria-hidden","true")}}
$("calculatorClose").onclick=()=>modalClose("calculatorModal");$("referenceClose").onclick=()=>modalClose("referenceModal");$("scratchClose").onclick=()=>modalClose("scratchModal");
["calculatorModal","referenceModal","scratchModal"].forEach(id=>$(id).addEventListener("click",e=>{if(e.target.id===id)modalClose(id)}));

let calcExpr="";
document.querySelectorAll("[data-calc]").forEach(b=>b.onclick=()=>{const v=b.dataset.calc;if(v==="C"){calcExpr="";$("calcDisplay").value="0";return}if(v==="sqrt"){try{let n=Function('"use strict";return ('+(calcExpr||"0")+')')();calcExpr=String(Math.sqrt(Number(n)));$("calcDisplay").value=calcExpr}catch(e){$("calcDisplay").value="Error"}return}if(v==="="){try{calcExpr=String(Function('"use strict";return ('+(calcExpr||"0")+')')());$("calcDisplay").value=calcExpr}catch(e){$("calcDisplay").value="Error"}return}calcExpr+=v;$("calcDisplay").value=calcExpr});

function showCalculator(exam,q){
 if(exam==="tsi")$("calculatorNotice").textContent="TSIA2 permits an on-screen calculator on some Mathematics questions. This ScorePath calculator is a practice tool and appears only on questions tagged calculator-allowed.";
 if(exam==="sat")$("calculatorNotice").textContent="Digital SAT Math allows calculator use. This ScorePath calculator is a practice implementation, not College Board's Bluebook calculator.";
 if(exam==="act")$("calculatorNotice").textContent="ACT allows a permitted calculator on the Mathematics test. This ScorePath calculator is a practice implementation, not an ACT-provided calculator.";
 modalOpen("calculatorModal");
}
function showReference(exam,q){
 if(exam==="sat")$("referenceNotice").textContent="Digital SAT Math provides a reference sheet with common formulas. This practice panel contains common geometry formulas for study.";
 else $("referenceNotice").textContent="This is a ScorePath Practice study reference for the current math topic. It is not presented as an official universal reference sheet for this exam.";
 modalOpen("referenceModal");
}
function toolVisibility(exam,q,stateObj){
 const strict=!!stateObj.timed;
 const isMath=q&&(q.section==="Math"||q.section==="Mathematics");
 const isGeo=q&&/Geometry|Geometric|Trigonometry/i.test(q.skill||"");
 const pre=exam==="tsi"?"":exam;
 const calc=$(pre+"CalcBtn"),ref=$(pre+"RefBtn"),scratch=$(pre+"ScratchBtn"),read=$(pre+"ReadBtn"),hint=$(pre+"HintBtn");
 if(calc)calc.hidden=!(q&&q.calculatorAllowed);
 if(ref)ref.hidden=!(isMath&&(exam==="sat"||isGeo));
 if(scratch)scratch.hidden=!isMath;
 if(read)read.hidden=strict; // TTS is a study/accessibility aid here, not implied as a default test-day tool.
 if(hint)hint.hidden=strict; // no hints in strict simulation
}
function readQuestion(q){
 if(!("speechSynthesis" in window)){alert("Read-aloud is not supported by this browser.");return}
 speechSynthesis.cancel();const text=(q.passage?q.passage+" ":"")+q.q+" "+q.choices.map((x,i)=>String.fromCharCode(65+i)+". "+x).join(". ");
 const u=new SpeechSynthesisUtterance(text);u.rate=.95;speechSynthesis.speak(u);
}
function hintFor(q,level=1){
 const skill=q.skill||"";
 if(/Algebra/i.test(skill))return level===1?"Identify the operation that is keeping the variable from being isolated.":"Undo operations in reverse order and keep both sides of the equation balanced.";
 if(/Geometr|Trigonometry/i.test(skill))return level===1?"Identify the shape and the quantity being asked for before choosing a formula.":"Write the matching area, volume, or right-triangle relationship before substituting values.";
 if(/Quantitative|Data|Stat|Probability/i.test(skill))return level===1?"Write down the part, whole, rate, or ratio described in the question.":"Keep units aligned and use a proportion or part ÷ whole relationship when appropriate.";
 if(/Grammar|Conventions|Punctuation|Usage/i.test(skill))return level===1?"Identify the grammatical subject, clause boundary, or punctuation decision being tested.":"Read the sentence without interrupting phrases and check agreement or sentence boundaries.";
 if(/Main Idea|Information|Reading|Inference/i.test(skill))return level===1?"Look for the choice supported by the passage as a whole, not just one phrase.":"Eliminate choices that add information the text never states or implies.";
 if(/Transition|Expression|Organization|Rhetoric/i.test(skill))return level===1?"Identify the logical relationship between the surrounding ideas.":"Decide whether the relationship is contrast, cause/effect, example, continuation, or conclusion.";
 return level===1?"Identify the skill being tested and eliminate choices you can prove are wrong.":"Use the information given in the question before relying on outside assumptions.";
}
const hintLevels={tsi:{},sat:{},act:{}};
function revealHint(exam,q){
 const box=$(exam==="tsi"?"hintBox":exam+"HintBox"),levels=hintLevels[exam],n=(levels[q.id]||0)+1;levels[q.id]=Math.min(n,2);
 box.innerHTML=`<b>Hint ${levels[q.id]}:</b> ${hintFor(q,levels[q.id])}${levels[q.id]<2?' <span style="color:#92400e">Click Hint again for one more step.</span>':''}`;box.classList.add("show");
 // Questions that needed a hint are automatically placed into study-later via bookmarks.
 const st=exam==="tsi"?store:exam==="sat"?satStore:actStore;
 if(!st.bookmarks.includes(q.id))st.bookmarks.push(q.id);
 if(exam==="tsi")save();else if(exam==="sat")saveSAT();else saveACT();
}
function focusedRationale(q,answer){
 if(answer===undefined||answer===q.a)return "";
 const why=q.why&&q.why[answer]?q.why[answer]:"That option does not satisfy the question.";
 return `<div class="focusRationale"><b>Why your selected answer missed the target:</b> ${why}</div>`;
}
function analysisText(set,answers,elapsed){
 const skills={};set.forEach(q=>{if(!skills[q.skill])skills[q.skill]={c:0,t:0};skills[q.skill].t++;if(answers[q.id]===q.a)skills[q.skill].c++});
 const ranked=Object.entries(skills).map(([k,v])=>({k,p:Math.round(v.c/v.t*100)})).sort((a,b)=>b.p-a.p);
 const strong=ranked[0],weak=ranked[ranked.length-1],answered=set.filter(q=>answers[q.id]!==undefined).length,avg=answered?Math.round(elapsed/answered):0;
 let pace=avg<=75?"Your average pace was efficient for this practice set.":avg<=120?"Your pace was moderate; review long questions to find where time was spent.":"Time management needs attention; aim to recognize the question type before starting calculations or close reading.";
 return `${strong?`Strongest area: <b>${strong.k}</b> (${strong.p}%). `:""}${weak&&weak.k!==strong?.k?`Priority review area: <b>${weak.k}</b> (${weak.p}%). `:""}${pace} This analysis is based only on this practice session and is not an official score prediction.`;
}

// Scratchpad
const sc=$("scratchCanvas"),ctx=sc.getContext("2d");let drawing=false,last=null;
function canvasPoint(e){const r=sc.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return{x:(t.clientX-r.left)*(sc.width/r.width),y:(t.clientY-r.top)*(sc.height/r.height)}}
function down(e){drawing=true;last=canvasPoint(e);e.preventDefault()}function move(e){if(!drawing)return;const p=canvasPoint(e);ctx.strokeStyle="#0f172a";ctx.lineWidth=3;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;e.preventDefault()}function up(){drawing=false}
["mousedown","touchstart"].forEach(ev=>sc.addEventListener(ev,down,{passive:false}));["mousemove","touchmove"].forEach(ev=>sc.addEventListener(ev,move,{passive:false}));["mouseup","mouseleave","touchend"].forEach(ev=>sc.addEventListener(ev,up));$("scratchClear").onclick=()=>ctx.clearRect(0,0,sc.width,sc.height);

// Button handlers
$("calcBtn").onclick=()=>showCalculator("tsi",state.set[state.i]);$("refBtn").onclick=()=>showReference("tsi",state.set[state.i]);$("scratchBtn").onclick=()=>modalOpen("scratchModal");$("readBtn").onclick=()=>readQuestion(state.set[state.i]);$("hintBtn").onclick=()=>revealHint("tsi",state.set[state.i]);
$("satCalcBtn").onclick=()=>showCalculator("sat",satState.set[satState.i]);$("satRefBtn").onclick=()=>showReference("sat",satState.set[satState.i]);$("satScratchBtn").onclick=()=>modalOpen("scratchModal");$("satReadBtn").onclick=()=>readQuestion(satState.set[satState.i]);$("satHintBtn").onclick=()=>revealHint("sat",satState.set[satState.i]);
$("actCalcBtn").onclick=()=>showCalculator("act",actState.set[actState.i]);$("actRefBtn").onclick=()=>showReference("act",actState.set[actState.i]);$("actScratchBtn").onclick=()=>modalOpen("scratchModal");$("actReadBtn").onclick=()=>readQuestion(actState.set[actState.i]);$("actHintBtn").onclick=()=>revealHint("act",actState.set[actState.i]);

// Difficulty filtering
function applyDifficulty(set,selectId){const v=$(selectId)?.value||"All";if(v==="All")return set;const f=set.filter(q=>q.difficulty===v);return f.length?f:set}

// Wrap set builders for difficulty
const oldSelectSet=selectSet;selectSet=function(mode){return applyDifficulty(oldSelectSet(mode),"tsiDifficulty")};
const oldSatSet=satSet;satSet=function(mode){return applyDifficulty(oldSatSet(mode),"satDifficulty")};
const oldActSet=actSet;actSet=function(mode){return applyDifficulty(oldActSet(mode),"actDifficulty")};

// Make every practice set count down while preserving strict simulation behavior.
function beginPacing(exam,stateObj,timerId,finishFn,seconds){
 clearInterval(stateObj.timerId);stateObj.duration=seconds;stateObj.seconds=seconds;$(timerId).textContent=formatTime(seconds);$(timerId).classList.remove("dangerTime");
 stateObj.timerId=setInterval(()=>{stateObj.seconds--;$(timerId).textContent=formatTime(stateObj.seconds);if(stateObj.seconds<=300)$(timerId).classList.add("dangerTime");if(stateObj.seconds<=0){clearInterval(stateObj.timerId);finishFn(true)}},1000);
}
const originalStartTest=startTest;startTest=function(mode){originalStartTest(mode);if(state.set.length&&!state.timed)beginPacing("tsi",state,"timer",finishTest,PACING.tsi)};
const originalStartSAT=startSAT;startSAT=function(mode){originalStartSAT(mode);if(satState.set.length&&!satState.timed)beginPacing("sat",satState,"satTimer",finishSAT,PACING.sat)};
const originalStartACT=startACT;startACT=function(mode){originalStartACT(mode);if(actState.set.length&&!actState.timed)beginPacing("act",actState,"actTimer",finishACT,PACING.act)};

// Render hooks: tools + no visible confidence/tips.
const professionalRenderQ=renderQ;renderQ=function(){professionalRenderQ();const q=state.set[state.i];if(q){toolVisibility("tsi",q,state);$("hintBox").classList.remove("show")}};
const professionalRenderSAT=renderSAT;renderSAT=function(){professionalRenderSAT();const q=satState.set[satState.i];if(q){toolVisibility("sat",q,satState);$("satHintBox").classList.remove("show")}};
const professionalRenderACT=renderACT;renderACT=function(){professionalRenderACT();const q=actState.set[actState.i];if(q){toolVisibility("act",q,actState);$("actHintBox").classList.remove("show")}};

// Explanation hooks: add selected-distractor rationale.
const originalShowExplanation=showExplanation;showExplanation=function(q){originalShowExplanation(q);const a=state.answers[q.id];$("explanation").querySelector(".expBody")?.insertAdjacentHTML("afterbegin",focusedRationale(q,a))};
const originalRenderGeneric=renderGeneric;renderGeneric=function(stateObj,prefix,st,saveFn,renderFn){originalRenderGeneric(stateObj,prefix,st,saveFn,renderFn);const q=stateObj.set[stateObj.i];if(q&&!stateObj.timed&&stateObj.submitted[q.id]){const ex=$(prefix+"Explanation"),body=ex.querySelector(".expBody");if(body&&!body.querySelector(".focusRationale"))body.insertAdjacentHTML("afterbegin",focusedRationale(q,stateObj.answers[q.id]))}};

// Result analysis hooks.
const finishTestAnalysis=finishTest;finishTest=function(auto=false){const elapsedBefore=state.duration?state.duration-state.seconds:Math.round((Date.now()-state.start)/1000);finishTestAnalysis(auto);if($("results").classList.contains("show"))$("smartAnalysis").querySelector("p").innerHTML=analysisText(state.set,state.answers,Math.max(0,elapsedBefore))};
const finishSATAnalysis=finishSAT;finishSAT=function(auto=false){const elapsedBefore=satState.duration?satState.duration-satState.seconds:Math.round((Date.now()-satState.start)/1000);finishSATAnalysis(auto);if($("satResults").classList.contains("show"))$("satSmartAnalysis").querySelector("p").innerHTML=analysisText(satState.set,satState.answers,Math.max(0,elapsedBefore))};
const finishACTAnalysis=finishACT;finishACT=function(auto=false){const elapsedBefore=actState.duration?actState.duration-actState.seconds:Math.round((Date.now()-actState.start)/1000);finishACTAnalysis(auto);if($("actResults").classList.contains("show"))$("actSmartAnalysis").querySelector("p").innerHTML=analysisText(actState.set,actState.answers,Math.max(0,elapsedBefore))};


/* Randomized question sessions + Start Test gate + answer-key-after-explanation */
let pendingTSIMode=null,pendingSATMode=null,pendingACTMode=null;

function deepCloneQuestions(arr){return arr.map(q=>JSON.parse(JSON.stringify(q)))}
function secureShuffle(arr){
 const a=[...arr];
 if(window.crypto&&crypto.getRandomValues){
  for(let i=a.length-1;i>0;i--){
   const buf=new Uint32Array(1);crypto.getRandomValues(buf);
   const j=buf[0]%(i+1);[a[i],a[j]]=[a[j],a[i]];
  }
 }else{
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
 }
 return a;
}
function randomizeChoices(q){
 const items=q.choices.map((choice,i)=>({choice,why:q.why?.[i]||"",correct:i===q.a}));
 const mixed=secureShuffle(items);
 q.choices=mixed.map(x=>x.choice);q.why=mixed.map(x=>x.why);q.a=mixed.findIndex(x=>x.correct);
 return q;
}
function randomizeSet(set){return secureShuffle(deepCloneQuestions(set)).map(randomizeChoices)}
function sessionCode(){return Math.random().toString(36).slice(2,7).toUpperCase()+"-"+Date.now().toString(36).slice(-4).toUpperCase()}

function showStartGate(exam,mode,set){
 const map={
  tsi:{gate:"tsiStartGate",shell:"practiceShell",name:"tsiStartName",meta:"tsiStartMeta"},
  sat:{gate:"satStartGate",shell:"satPracticeShell",name:"satStartName",meta:"satStartMeta"},
  act:{gate:"actStartGate",shell:"actPracticeShell",name:"actStartName",meta:"actStartMeta"}
 };
 const m=map[exam];$(m.shell).classList.remove("show");$(m.gate).classList.add("show");
 const names={
  math:"TSI Mathematics Practice Test",elar:"TSI ELAR Practice Test",diagnostic:"TSI Diagnostic Test",timed:"TSI Timed Simulation",mistakes:"TSI Mistake Review",bookmarks:"TSI Saved Questions",
  "sat-rw":"Digital SAT Reading & Writing Practice","sat-math":"Digital SAT Math Practice","sat-diagnostic":"Digital SAT Diagnostic","sat-timed-rw":"Digital SAT Reading & Writing Timed Module","sat-timed-math":"Digital SAT Math Timed Module",
  "act-english":"ACT English Practice","act-math":"ACT Math Practice","act-reading":"ACT Reading Practice","act-science":"ACT Science Practice (Optional)","act-diagnostic":"ACT Diagnostic","act-timed":"ACT Timed Mixed Practice"
 };
 $(m.name).textContent=names[mode]||"Practice Test";
 $(m.meta).textContent=`${set.length} questions • Session ${sessionCode()}`;
 location.hash=exam==="tsi"?"tsi-center":exam==="sat"?"sat-center":"act-center";
}

function prepareTSI(mode){
 clearInterval(state.timerId);
 const raw=selectSet(mode);
 if(!raw.length){alert("There are no questions available in this set yet.");showDash();return}
 pendingTSIMode={mode,set:randomizeSet(raw)};
 hideAll();$("dashHome").classList.add("hidden");showStartGate("tsi",mode,pendingTSIMode.set);
}
function prepareSAT(mode){
 clearInterval(satState.timerId);
 const raw=satSet(mode);
 if(!raw.length){alert("There are no questions available in this set yet.");satDash();return}
 pendingSATMode={mode,set:randomizeSet(raw)};
 satHideAll();$("satHome").classList.add("hidden");showStartGate("sat",mode,pendingSATMode.set);
}
function prepareACT(mode){
 clearInterval(actState.timerId);
 const raw=actSet(mode);
 if(!raw.length){alert("There are no questions available in this set yet.");actDash();return}
 pendingACTMode={mode,set:randomizeSet(raw)};
 actHideAll();$("actHome").classList.add("hidden");showStartGate("act",mode,pendingACTMode.set);
}

function launchTSI(){
 if(!pendingTSIMode)return;const {mode,set}=pendingTSIMode;pendingTSIMode=null;
 $("tsiStartGate").classList.remove("show");
 clearInterval(state.timerId);
 const timed=mode==="timed";
 state={set,i:0,answers:{},confidence:{},flags:[],timed,start:Date.now(),seconds:timed?30*60:0,timerId:null,mode,submitted:{},duration:timed?30*60:0};
 $("practiceShell").classList.add("show");$("results").classList.remove("show");
 $("testTitle").textContent=mode==="math"?"TSI Mathematics Practice":mode==="elar"?"TSI ELAR Practice":mode==="diagnostic"?"TSI Diagnostic Practice":mode==="timed"?"TSI Timed Simulation":"TSI Review Practice";
 $("confidenceBox")?.classList.add("hidden");$("submitAnswerBtn").classList.toggle("hidden",timed);
 if(timed)beginPacing("tsi",state,"timer",finishTest,30*60);else beginPacing("tsi",state,"timer",finishTest,PACING.tsi);
 renderQ();
}
function launchSAT(){
 if(!pendingSATMode)return;const {mode,set}=pendingSATMode;pendingSATMode=null;
 $("satStartGate").classList.remove("show");
 clearInterval(satState.timerId);
 const timed=mode==="sat-timed-rw"||mode==="sat-timed-math",duration=mode==="sat-timed-rw"?32*60:mode==="sat-timed-math"?35*60:PACING.sat;
 satState={set,i:0,answers:{},confidence:{},flags:[],timed,start:Date.now(),seconds:duration,timerId:null,mode,submitted:{},duration};
 $("satPracticeShell").classList.add("show");$("satResults").classList.remove("show");
 $("satTestTitle").textContent=mode.includes("math")?"Digital SAT Math":mode.includes("rw")?"Digital SAT Reading & Writing":mode==="sat-diagnostic"?"Digital SAT Diagnostic":"SAT Review";
 $("satConfidenceBox")?.classList.add("hidden");$("satSubmitBtn").classList.toggle("hidden",timed);
 beginPacing("sat",satState,"satTimer",finishSAT,duration);renderSAT();
}
function launchACT(){
 if(!pendingACTMode)return;const {mode,set}=pendingACTMode;pendingACTMode=null;
 $("actStartGate").classList.remove("show");
 clearInterval(actState.timerId);
 const timed=mode==="act-timed",duration=timed?20*60:PACING.act;
 actState={set,i:0,answers:{},confidence:{},flags:[],timed,start:Date.now(),seconds:duration,timerId:null,mode,submitted:{},duration};
 $("actPracticeShell").classList.add("show");$("actResults").classList.remove("show");
 const titles={"act-english":"ACT English Practice","act-math":"ACT Math Practice","act-reading":"ACT Reading Practice","act-science":"ACT Science Practice (Optional)","act-diagnostic":"ACT Diagnostic Practice","act-timed":"ACT Timed Mixed Practice"};
 $("actTestTitle").textContent=titles[mode]||"ACT Review";$("actConfidenceBox")?.classList.add("hidden");$("actSubmitBtn").classList.toggle("hidden",timed);
 beginPacing("act",actState,"actTimer",finishACT,duration);renderACT();
}

// Replace click-start behavior with gated launch.
document.querySelectorAll("[data-start]").forEach(x=>x.onclick=()=>x.dataset.start==="essay"?startTest("essay"):prepareTSI(x.dataset.start));
document.querySelectorAll("[data-sat-start]").forEach(x=>x.onclick=()=>prepareSAT(x.dataset.satStart));
document.querySelectorAll("[data-act-start]").forEach(x=>x.onclick=()=>x.dataset.actStart==="act-writing"?openACTWriting():prepareACT(x.dataset.actStart));
document.querySelectorAll("[data-open]").forEach(x=>x.onclick=()=>setTimeout(()=>x.dataset.open==="essay"?startTest("essay"):prepareTSI(x.dataset.open),20));
safeClick("heroTimed",()=>setTimeout(()=>prepareTSI("timed"),20));

$("tsiBeginBtn").onclick=launchTSI;$("satBeginBtn").onclick=launchSAT;$("actBeginBtn").onclick=launchACT;
$("tsiCancelStart").onclick=()=>{$("tsiStartGate").classList.remove("show");pendingTSIMode=null;showDash()};
$("satCancelStart").onclick=()=>{$("satStartGate").classList.remove("show");pendingSATMode=null;satDash()};
$("actCancelStart").onclick=()=>{$("actStartGate").classList.remove("show");pendingACTMode=null;actDash()};

// Saved/mistake review also generates fresh order/choice positions.
$("reviewMistakesBtn").onclick=()=>prepareTSI("mistakes");
$("practiceSavedBtn").onclick=e=>prepareTSI(e.currentTarget.dataset.type);
$("satWeakBtn").onclick=()=>prepareSAT("mistakes");$("satPracticeSavedBtn").onclick=e=>prepareSAT(e.currentTarget.dataset.type);
$("actWeakBtn").onclick=()=>prepareACT("mistakes");$("actPracticeSavedBtn").onclick=e=>prepareACT(e.currentTarget.dataset.type);

// Show the explanation first; answer key appears at the bottom.
function reorderAnswerKey(explanationEl,q){
 if(!explanationEl||!q)return;
 const head=explanationEl.querySelector(".expHead");
 if(head){
   const ok=/Correct/.test(head.textContent);
   head.textContent=ok?"✓ Response Review":"✕ Response Review";
 }
 const body=explanationEl.querySelector(".expBody");
 if(body&&!body.querySelector(".answerKeyBox")){
   body.insertAdjacentHTML("beforeend",`<div class="answerKeyBox"><b>Answer Key</b>${String.fromCharCode(65+q.a)}. ${q.choices[q.a]}</div>`);
 }
}
const answerKeyShowExplanation=showExplanation;
showExplanation=function(q){answerKeyShowExplanation(q);reorderAnswerKey($("explanation"),q)};
const answerKeyRenderGeneric=renderGeneric;
renderGeneric=function(stateObj,prefix,st,saveFn,renderFn){
 answerKeyRenderGeneric(stateObj,prefix,st,saveFn,renderFn);
 const q=stateObj.set[stateObj.i];
 if(q&&!stateObj.timed&&stateObj.submitted[q.id])reorderAnswerKey($(prefix+"Explanation"),q);
}


/* Unlimited randomized practice + full answer reviews + progress dashboard */
function fullReviewHTML(q,answer){
 const your=answer===undefined?"Unanswered":`${String.fromCharCode(65+answer)}. ${q.choices[answer]}`;
 const correct=`${String.fromCharCode(65+q.a)}. ${q.choices[q.a]}`;
 return `<div class="answerSummary"><div><b>Your Answer</b>${your}</div><div><b>Correct Answer</b>${correct}</div></div>
 <div class="fullReview"><b>Complete Choice Review</b><div class="fullReviewGrid">
 ${q.choices.map((c,i)=>{
   const isCorrect=i===q.a,isYours=i===answer;
   const cls=isCorrect?" correctChoice":(isYours&&!isCorrect?" userWrongChoice":"");
   const status=isCorrect?`<span class="choiceStatus correct">Correct Answer</span>`:(isYours?`<span class="choiceStatus yours">Your Answer</span>`:"");
   return `<div class="reviewChoice${cls}"><span class="choiceBadge">${String.fromCharCode(65+i)}</span><span>${c}</span>${status}<div class="reviewRationale">${q.why?.[i]||""}</div></div>`
 }).join("")}
 </div><div class="strategy" style="margin-top:10px"><b>Step-by-Step Explanation:</b> ${q.ex}<br><br><b>Strategy:</b> ${q.strategy}<br><br><b>Question ID:</b> ${q.id} &nbsp; <b>Skill:</b> ${q.skill} &nbsp; <b>Blueprint:</b> ${q.blueprintDomain||q.skill} &nbsp; <b>Difficulty:</b> ${q.difficulty}</div></div>`;
}
function enrichResultReview(containerId,set,answers){
 const box=$(containerId);if(!box)return;
 box.innerHTML=set.map(q=>{
   const a=answers[q.id],ok=a===q.a;
   return `<div class="reviewCard ${ok?"good":"bad"}"><b>${q.id} — ${ok?"Correct":"Needs Review"}</b>${fullReviewHTML(q,a)}</div>`;
 }).join("");
}
function currentExamModeToRetry(mode,exam){
 if(exam==="tsi"){
  if(["math","elar","diagnostic","timed"].includes(mode))return mode;
  return "diagnostic";
 }
 if(exam==="sat"){
  if(["sat-rw","sat-math","sat-diagnostic","sat-timed-rw","sat-timed-math"].includes(mode))return mode;
  return "sat-diagnostic";
 }
 if(["act-english","act-math","act-reading","act-science","act-diagnostic","act-timed"].includes(mode))return mode;
 return "act-diagnostic";
}
$("tsiNewTestBtn").onclick=()=>prepareTSI(currentExamModeToRetry(state.mode,"tsi"));
$("satNewTestBtn").onclick=()=>prepareSAT(currentExamModeToRetry(satState.mode,"sat"));
$("actNewTestBtn").onclick=()=>prepareACT(currentExamModeToRetry(actState.mode,"act"));

// Result wrapping: replace compact cards with full explanations/answer key for every question.
const fullFinishTest=finishTest;finishTest=function(auto=false){fullFinishTest(auto);if($("results").classList.contains("show")){enrichResultReview("reviewList",state.set,state.answers);renderProgress()}};
const fullFinishSAT=finishSAT;finishSAT=function(auto=false){fullFinishSAT(auto);if($("satResults").classList.contains("show")){enrichResultReview("satReviewList",satState.set,satState.answers);renderProgress()}};
const fullFinishACT=finishACT;finishACT=function(auto=false){fullFinishACT(auto);if($("actResults").classList.contains("show")){enrichResultReview("actReviewList",actState.set,actState.answers);renderProgress()}};

// Keep per-skill session data in history so progress recommendations are based on actual completed work.
function skillSnapshot(set,answers){
 const out={};set.forEach(q=>{if(!out[q.skill])out[q.skill]={correct:0,total:0};out[q.skill].total++;if(answers[q.id]===q.a)out[q.skill].correct++});return out;
}
function attachLatestSkills(storeObj,set,answers){
 if(storeObj.history?.length){storeObj.history[storeObj.history.length-1].skills=skillSnapshot(set,answers)}
}
const skillFinishTest=finishTest;finishTest=function(auto=false){skillFinishTest(auto);attachLatestSkills(store,state.set,state.answers);save();renderProgress()};
const skillFinishSAT=finishSAT;finishSAT=function(auto=false){skillFinishSAT(auto);attachLatestSkills(satStore,satState.set,satState.answers);saveSAT();renderProgress()};
const skillFinishACT=finishACT;finishACT=function(auto=false){skillFinishACT(auto);attachLatestSkills(actStore,actState.set,actState.answers);saveACT();renderProgress()};

let progressExam="all";
function examBundle(key){
 if(key==="tsi")return [{key:"tsi",name:"TSI",store:store}];
 if(key==="sat")return [{key:"sat",name:"SAT",store:satStore}];
 if(key==="act")return [{key:"act",name:"ACT",store:actStore}];
 return [{key:"tsi",name:"TSI",store:store},{key:"sat",name:"SAT",store:satStore},{key:"act",name:"ACT",store:actStore}];
}
function renderProgress(){
 if(!$("pTests"))return;
 const bundles=examBundle(progressExam);
 const tests=bundles.flatMap(b=>(b.store.history||[]).map(h=>({...h,exam:b.name}))).sort((a,b)=>new Date(b.date)-new Date(a.date));
 const q=bundles.reduce((n,b)=>n+(b.store.answered||0),0),c=bundles.reduce((n,b)=>n+(b.store.correct||0),0);
 const mistakes=bundles.reduce((n,b)=>n+(b.store.mistakes||[]).length,0),saved=bundles.reduce((n,b)=>n+(b.store.bookmarks||[]).length,0);
 $("pTests").textContent=tests.length;$("pQuestions").textContent=q;$("pAccuracy").textContent=q?Math.round(c/q*100)+"%":"—";$("pMistakes").textContent=mistakes;$("pSaved").textContent=saved;
 const chronological=[...tests].reverse().slice(-12);
 $("pTrend").innerHTML=chronological.length?`<div class="trendChart">${chronological.map(h=>{const p=h.total?Math.round(h.score/h.total*100):0;return `<div class="trendBar" style="height:${Math.max(5,p)}%" title="${h.exam}: ${p}%"><span>${p}%</span></div>`}).join("")}</div>`:`<div class="progressEmpty">No completed tests yet.</div>`;
 const skills={};
 tests.forEach(h=>Object.entries(h.skills||{}).forEach(([k,v])=>{if(!skills[k])skills[k]={correct:0,total:0};skills[k].correct+=v.correct;skills[k].total+=v.total}));
 const ranked=Object.entries(skills).map(([k,v])=>({k,p:Math.round(v.correct/v.total*100),n:v.total})).sort((a,b)=>b.p-a.p);
 if(ranked.length){
   const strongest=ranked.slice(0,3),weakest=[...ranked].reverse().slice(0,3);
   $("pSkills").innerHTML=`<b style="font-size:12px;color:#166534">Strongest</b>${strongest.map(x=>`<div class="skillPill"><span>${x.k}</span><b>${x.p}%</b></div>`).join("")}<b style="font-size:12px;color:#991b1b;display:block;margin-top:12px">Priority Review</b>${weakest.map(x=>`<div class="skillPill"><span>${x.k}</span><b>${x.p}%</b></div>`).join("")}`;
   const w=weakest[0],recent=chronological.slice(-3),recentAvg=recent.length?Math.round(recent.reduce((n,h)=>n+(h.total?h.score/h.total*100:0),0)/recent.length):0;
   $("pRecommendation").className="";
   $("pRecommendation").innerHTML=`<p style="margin:0;color:#475569;font-size:13px;line-height:1.65"><b>Next focus:</b> ${w.k}. Your recorded accuracy in this skill is ${w.p}% across ${w.n} question${w.n===1?"":"s"}. ${recent.length?`Your recent-test average is ${recentAvg}%. `:""}Review missed questions, then start a new randomized set in the same exam. This recommendation is based only on your saved practice history and is not an official score prediction.</p>`;
 }else{$("pSkills").innerHTML=`<div class="progressEmpty">Skill analysis appears after completed tests.</div>`;$("pRecommendation").className="progressEmpty";$("pRecommendation").textContent="Complete a practice test to generate recommendations."}
 $("pHistory").innerHTML=tests.length?`<div style="overflow:auto"><table class="historyTable"><thead><tr><th>Date</th><th>Exam</th><th>Test</th><th>Result</th><th>Accuracy</th><th>Time</th></tr></thead><tbody>${tests.slice(0,15).map(h=>`<tr><td>${new Date(h.date).toLocaleDateString()}</td><td>${h.exam}</td><td>${h.mode||"Practice"}</td><td>${h.score}/${h.total}</td><td>${h.total?Math.round(h.score/h.total*100):0}%</td><td>${formatTime(h.time||0)}</td></tr>`).join("")}</tbody></table></div>`:`<div class="progressEmpty">Your completed practice tests will appear here.</div>`;
}
document.querySelectorAll("[data-progress-exam]").forEach(b=>b.onclick=()=>{progressExam=b.dataset.progressExam;document.querySelectorAll("[data-progress-exam]").forEach(x=>x.classList.toggle("active",x===b));renderProgress()});
renderProgress();


/* Expanded original question bank and writing labs */
const TSI_ESSAY_PROMPTS=[
"Some colleges require students to complete a first-year seminar on study skills and time management. Should such a course be required for all first-year students? Take a position and support it with reasons and examples.",
"Some schools limit student use of phones during class time. Should schools restrict phone use during instruction? Take a position and support it with specific reasoning.",
"Many communities invest public money in parks, libraries, and recreation centers. Which type of community resource should receive the highest priority, and why?",
"Some employers allow workers to choose flexible schedules while others require fixed hours. Which approach is better for most workplaces? Defend your position.",
"Some colleges encourage students to take courses outside their major. Should students be required to study subjects outside their main field? Explain your position.",
"Public transportation can reduce traffic and pollution, but expanding it can be expensive. Should cities prioritize public transportation over road expansion? Support your position.",
"Some high schools require community service for graduation. Should community service be a graduation requirement? Defend your view.",
"Online courses offer flexibility, while in-person courses provide direct interaction. Which format is more effective for most college students? Support your position.",
"Some people believe students learn more from working in groups, while others learn more independently. Which approach should be used more often in college courses? Explain.",
"Colleges sometimes require students to attend orientation programs before classes begin. Should attendance be mandatory? Take a position and support it."
];

const ACT_WRITING_PROMPTS=[
{issue:"Schools increasingly use digital textbooks instead of printed books.",perspectives:["Digital materials are more flexible and easier to update.","Printed books encourage deeper focus and reduce screen fatigue.","Schools should combine formats and let course needs determine the best choice."]},
{issue:"Cities must decide how much public space should be reserved for cars, bicycles, pedestrians, and public transportation.",perspectives:["Road space should prioritize the largest number of travelers.","Cities should prioritize low-emission transportation even if drivers face delays.","Transportation design should vary by neighborhood and local need."]},
{issue:"Employers increasingly use remote or hybrid work arrangements.",perspectives:["Remote work should become the default when job duties allow it.","In-person work is essential for collaboration and workplace culture.","Flexible hybrid systems provide the best balance for many organizations."]},
{issue:"Schools are debating how much homework students should receive outside class.",perspectives:["Regular homework is necessary for mastery and responsibility.","Homework should be limited because learning time should remain mainly in school.","Homework should be assigned selectively when it has a clear learning purpose."]},
{issue:"Communities often debate whether public funds should support arts programs.",perspectives:["Arts deserve public investment because they strengthen culture and education.","Public funds should focus only on essential services.","Arts funding should depend on measurable community use and access."]}
];

function randInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function genTSIMath(){
 const out=[];
 for(let n=0;n<24;n++){
   const a=randInt(2,9),x=randInt(2,15),b=randInt(1,12),rhs=a*x+b;
   out.push({id:`TSI-GEN-ALG-${Date.now().toString(36)}-${n}`,exam:"TSI",section:"Mathematics",skill:"Algebraic Reasoning",difficulty:n%3===0?"Easy":n%3===1?"Medium":"Hard",
   q:`Solve for x: ${a}x + ${b} = ${rhs}.`,choices:[String(x),String(x+1),String(Math.max(0,x-2)),String(x+3)],a:0,
   ex:`Subtract ${b} from both sides to get ${a}x = ${a*x}. Then divide by ${a}, so x = ${x}.`,
   why:[`${x} satisfies the equation.`,`${x+1} makes the left side too large.`,`${Math.max(0,x-2)} does not satisfy the equation.`,`${x+3} makes the left side too large.`],strategy:"Use inverse operations and check the solution by substitution."});
 }
 for(let n=0;n<12;n++){
   const pct=[10,20,25,30,40][randInt(0,4)],base=[40,60,80,100,120][randInt(0,4)],disc=base*pct/100,sale=base-disc;
   out.push({id:`TSI-GEN-QR-${Date.now().toString(36)}-${n}`,exam:"TSI",section:"Mathematics",skill:"Quantitative Reasoning",difficulty:"Medium",
   q:`An item costs $${base} and is discounted by ${pct}%. What is the sale price?`,choices:[`$${sale}`,`$${disc}`,`$${base+disc}`,`$${Math.max(0,sale-5)}`],a:0,
   ex:`The discount is ${pct}% of $${base}, which is $${disc}. Subtract the discount from the original price: $${base} − $${disc} = $${sale}.`,
   why:[`This is the correct sale price.`,`This is the discount amount, not the final price.`,`This incorrectly adds the discount.`,`This does not match the calculated discount.`],strategy:"Find the discount amount first, then subtract it from the original price."});
 }
 return out.map(randomizeChoices);
}
function genSATMath(){
 const out=[];
 for(let n=0;n<24;n++){
   const m=randInt(2,8),x=randInt(2,12),b=randInt(1,9),rhs=m*x+b;
   out.push(randomizeChoices({id:`SAT-GEN-ALG-${Date.now().toString(36)}-${n}`,section:"Math",skill:"Algebra",difficulty:n%2?"Medium":"Easy",calculatorAllowed:true,
   q:`If ${m}x + ${b} = ${rhs}, what is the value of x?`,choices:[String(x),String(x+2),String(Math.max(1,x-1)),String(rhs-b)],a:0,
   ex:`Subtract ${b}: ${m}x = ${rhs-b}. Divide by ${m}: x = ${x}.`,
   why:[`This value satisfies the equation.`,`This value is too large.`,`This value does not satisfy the equation.`,`This is the value of ${m}x before division.`],strategy:"Isolate x with inverse operations, then substitute to verify."}));
 }
 for(let n=0;n<12;n++){
   const r=randInt(2,9),area=r*r;
   out.push(randomizeChoices({id:`SAT-GEN-GEO-${Date.now().toString(36)}-${n}`,section:"Math",skill:"Geometry & Trigonometry",difficulty:"Medium",calculatorAllowed:true,
   q:`A circle has radius ${r}. Which expression gives its area?`,choices:[`${area}π`,`${2*r}π`,`${r}π`,`${2*area}π`],a:0,
   ex:`Area of a circle is πr². With r=${r}, the area is π(${r}²) = ${area}π.`,
   why:[`This correctly uses πr².`,`This is the circumference 2πr.`,`This does not square the radius.`,`This doubles the correct area.`],strategy:"Identify whether the problem asks for area or circumference before choosing a formula."}));
 }
 return out;
}
function genACTMath(){
 const out=[];
 for(let n=0;n<24;n++){
   const x=randInt(2,12),a=randInt(2,7),b=randInt(1,10),rhs=a*x-b;
   out.push(randomizeChoices({id:`ACT-GEN-ALG-${Date.now().toString(36)}-${n}`,section:"Math",skill:"Algebra",difficulty:n%3===0?"Easy":"Medium",calculatorAllowed:true,
   q:`If ${a}x − ${b} = ${rhs}, what is x?`,choices:[String(x),String(x+1),String(Math.max(1,x-2)),String(rhs+b)],a:0,
   ex:`Add ${b} to both sides: ${a}x = ${rhs+b}. Divide by ${a}: x = ${x}.`,
   why:[`This satisfies the equation.`,`This is one too large.`,`This does not satisfy the equation.`,`This is ${a}x before dividing by ${a}.`],strategy:"Undo subtraction, then divide by the coefficient."}));
 }
 for(let n=0;n<12;n++){
   const b=randInt(4,14),h=randInt(3,12),area=b*h/2;
   out.push(randomizeChoices({id:`ACT-GEN-GEO-${Date.now().toString(36)}-${n}`,section:"Math",skill:"Geometry",difficulty:"Medium",calculatorAllowed:true,
   q:`A triangle has base ${b} and height ${h}. What is its area?`,choices:[String(area),String(b*h),String(b+h),String(2*(b+h))],a:0,
   ex:`Triangle area = 1/2 × base × height = 1/2 × ${b} × ${h} = ${area}.`,
   why:[`This is the correct triangle area.`,`This omits the one-half factor.`,`This adds base and height instead of finding area.`,`This is related to perimeter, not area.`],strategy:"Use A = 1/2 bh for triangle area."}));
 }
 return out;
}

function recentKey(exam){return `scorepathRecent-${exam}`}
function filterRecent(exam,set){
 let recent=[];try{recent=JSON.parse(localStorage.getItem(recentKey(exam))||"[]")}catch(e){}
 const fresh=set.filter(q=>!recent.includes(q.id));
 return fresh.length>=Math.min(8,set.length)?fresh:set;
}
function rememberSeen(exam,set){
 let recent=[];try{recent=JSON.parse(localStorage.getItem(recentKey(exam))||"[]")}catch(e){}
 recent=[...set.map(q=>q.id),...recent].slice(0,80);
 localStorage.setItem(recentKey(exam),JSON.stringify([...new Set(recent)]));
}

// Expand set builders while preserving reviewed static questions.
const expandedOldSelectSet=selectSet;
selectSet=function(mode){
 let base=expandedOldSelectSet(mode);
 if(["math","diagnostic","timed"].includes(mode)) base=[...base,...genTSIMath()];
 base=filterRecent("tsi",base);
 return secureShuffle(base).slice(0,mode==="timed"?20:mode==="diagnostic"?16:12);
};
const expandedOldSatSet=satSet;
satSet=function(mode){
 let base=expandedOldSatSet(mode);
 if(["sat-math","sat-diagnostic","sat-timed-math"].includes(mode)) base=[...base,...genSATMath()];
 base=filterRecent("sat",base);
 return secureShuffle(base).slice(0,mode.includes("timed")?16:12);
};
const expandedOldActSet=actSet;
actSet=function(mode){
 let base=expandedOldActSet(mode);
 if(["act-math","act-diagnostic","act-timed"].includes(mode)) base=[...base,...genACTMath()];
 base=filterRecent("act",base);
 return secureShuffle(base).slice(0,mode==="act-timed"?16:12);
};

// Remember active sets when launched.
const expandedLaunchTSI=launchTSI;launchTSI=function(){expandedLaunchTSI();if(state.set?.length)rememberSeen("tsi",state.set)};
const expandedLaunchSAT=launchSAT;launchSAT=function(){expandedLaunchSAT();if(satState.set?.length)rememberSeen("sat",satState.set)};
const expandedLaunchACT=launchACT;launchACT=function(){expandedLaunchACT();if(actState.set?.length)rememberSeen("act",actState.set)};

// TSI Essay
function setTSIEssayPrompt(){
 const prompt=TSI_ESSAY_PROMPTS[Math.floor(Math.random()*TSI_ESSAY_PROMPTS.length)];
 localStorage.setItem("scorepathTSIEssayPrompt",prompt);
 $("essayPromptBox").innerHTML=`<b>Practice Prompt:</b> ${prompt}`;
}
if($("newEssayPrompt"))$("newEssayPrompt").onclick=()=>{if($("essayText").value.trim()&&!confirm("Start a new prompt? Your current draft will stay saved in this browser."))return;setTSIEssayPrompt()};
const savedTSIPrompt=localStorage.getItem("scorepathTSIEssayPrompt");if(savedTSIPrompt&&$("essayPromptBox"))$("essayPromptBox").innerHTML=`<b>Practice Prompt:</b> ${savedTSIPrompt}`;else if($("essayPromptBox"))setTSIEssayPrompt();

// ACT Writing Lab
let actWritingStore=JSON.parse(localStorage.getItem("scorepathACTWriting")||'{"draft":"","prompt":null,"position":"","perspective":"","counter":"","evidence":""}');
function setACTWritingPrompt(){
 const p=ACT_WRITING_PROMPTS[Math.floor(Math.random()*ACT_WRITING_PROMPTS.length)];
 actWritingStore.prompt=p;saveACTWriting();
 $("actWritingPromptBox").innerHTML=`<b>Issue:</b> ${p.issue}<br><br><b>Perspective 1:</b> ${p.perspectives[0]}<br><b>Perspective 2:</b> ${p.perspectives[1]}<br><b>Perspective 3:</b> ${p.perspectives[2]}<br><br><b>Your task:</b> Write an essay in which you develop your own perspective on the issue and analyze the relationship between your perspective and at least one other perspective.`;
}
function saveACTWriting(){
 actWritingStore.draft=$("actWritingText")?.value||actWritingStore.draft;
 actWritingStore.position=$("actPosition")?.value||actWritingStore.position;
 actWritingStore.perspective=$("actPerspectivePlan")?.value||actWritingStore.perspective;
 actWritingStore.counter=$("actCounterPlan")?.value||actWritingStore.counter;
 actWritingStore.evidence=$("actEvidencePlan")?.value||actWritingStore.evidence;
 localStorage.setItem("scorepathACTWriting",JSON.stringify(actWritingStore));
 if($("actWritingSaveStatus"))$("actWritingSaveStatus").textContent="Draft saved in this browser.";
}
function openACTWriting(){
 actHideAll();$("actWritingLab").classList.add("show");
 if(!actWritingStore.prompt)setACTWritingPrompt();else $("actWritingPromptBox").innerHTML=`<b>Issue:</b> ${actWritingStore.prompt.issue}<br><br><b>Perspective 1:</b> ${actWritingStore.prompt.perspectives[0]}<br><b>Perspective 2:</b> ${actWritingStore.prompt.perspectives[1]}<br><b>Perspective 3:</b> ${actWritingStore.prompt.perspectives[2]}<br><br><b>Your task:</b> Write an essay in which you develop your own perspective on the issue and analyze the relationship between your perspective and at least one other perspective.`;
 $("actWritingText").value=actWritingStore.draft||"";$("actPosition").value=actWritingStore.position||"";$("actPerspectivePlan").value=actWritingStore.perspective||"";$("actCounterPlan").value=actWritingStore.counter||"";$("actEvidencePlan").value=actWritingStore.evidence||"";
 updateACTWritingWords();
 location.hash="act-center";
}
function updateACTWritingWords(){const t=$("actWritingText").value.trim();$("actWritingWordCount").textContent=(t?t.split(/\s+/).length:0)+" words"}
document.querySelectorAll('[data-act-start="act-writing"]').forEach(x=>x.onclick=openACTWriting);
$("newActWritingPrompt").onclick=()=>{if($("actWritingText").value.trim()&&!confirm("Start a new writing prompt? Your draft will remain saved."))return;setACTWritingPrompt()};
$("saveActWriting").onclick=saveACTWriting;$("closeActWriting").onclick=()=>{saveACTWriting();$("actWritingLab").classList.remove("show");actDash()};
$("actWritingText").addEventListener("input",()=>{updateACTWritingWords();saveACTWriting()});
["actPosition","actPerspectivePlan","actCounterPlan","actEvidencePlan"].forEach(id=>$(id).addEventListener("input",saveACTWriting));

updateSATDash();updateACTDash();
updateDash();
