# OPENOBSERVE ENTERPRISE END‑USER LICENSE AGREEMENT ("EULA") – **v2025‑05‑26**

> **IMPORTANT — READ CAREFULLY:**  By clicking **“I Agree,”** downloading, installing, or otherwise using the OpenObserve Enterprise Software, you (“**Licensee**”) accept this EULA and represent that you are authorized to bind the legal entity that will use the Software.  If you do not agree, do not download, install, or use the Software.

This EULA is between **OpenObserve Inc.**, a Delaware corporation with its principal place of business at **3000 Sand Hill Rd, Building 1, Suite 260, Menlo Park, CA 94025** (“**OpenObserve**”), and Licensee.  It governs Licensee’s use of the object‑code version of the OpenObserve Enterprise software and related updates, documentation, and support services (collectively, the “**Software**”).

---

## 1. DEFINITIONS

| Term                        | Meaning                                                                                                                                                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Affiliate**               | Any entity that Controls, is Controlled by, or is under common Control with a party. “Control” means >50 % ownership of voting securities or equivalent power.                                                                      |
| **Average Daily Ingestion** | The arithmetic mean of uncompressed data ingested over the immediately preceding **rolling 30‑day period**, measured in gigabytes (GB) per 24‑hour UTC day across **all clusters and instances** operated by the same legal entity. |
| **Free‑Tier Key**           | The no‑cost license key that activates the Free‑Tier License and periodically revalidates with OpenObserve servers.                                                                                                                 |
| **High‑Risk Activities**    | Uses in which failure of the Software could lead to death, personal injury, or severe environmental or property damage (e.g., nuclear facilities, aviation navigation, life‑support systems, weapons).                              |
| **Licensed Volume**         | The maximum Average Daily Ingestion permitted under the applicable license key.                                                                                                                                                     |
| **Personal Data**           | Any information relating to an identified or identifiable natural person processed by the Software’s telemetry or Usage Data features.                                                                                              |
| **Subscription Term**       | The period stated in a paid License Key during which Licensee may use the Software above the Free‑Tier limit.                                                                                                                       |

---

## 2. LICENSE GRANT

### 2.1  Free‑Tier License (≤ 200 GB/Day)

OpenObserve grants Licensee a **revocable**, royalty‑free, non‑exclusive license to install and use the Software **solely for Licensee’s internal business operations**, provided that Licensee’s **Average Daily Ingestion does not exceed 200 GB per 24‑hour UTC day** (the “**Free‑Tier Allowance**”).  The Free‑Tier License:

* Applies **per legal entity, and if multiple Affiliates are under common Control of the same parent company, their collective usage counts toward the Free‑Tier Allowance** (i.e., affiliated entities may not stack allowances).
* Requires registration for, and periodic online validation of, a **Free‑Tier Key** that automatically expires every 12 months unless renewed **(an offline activation file is available upon request for air‑gapped environments)**.
* May be **terminated for convenience** by OpenObserve on 30 days’ written notice.

For clarity, whether under the Free‑Tier or any Paid Subscription License, **Average Daily Ingestion is aggregated across all deployments, clusters, servers, and environments operated by the same legal entity**.  Example: if *Acme Corp* runs two installations ingesting 100 GB/day and 150 GB/day respectively, its total usage for licensing purposes is 250 GB/day.

### 2.2  Paid Subscription License (> 200 GB/Day)

If Licensee’s ingestion exceeds the Free‑Tier Allowance, Licensee must **prior to the overage** obtain a paid License Key covering the higher **Licensed Volume** and pay all applicable fees.  Subject to timely payment and compliance with this EULA, OpenObserve grants Licensee a non‑exclusive license to use the Software within Licensee’s internal business operations during the Subscription Term and up to the Licensed Volume.

### 2.3  Evaluation License

If OpenObserve issues an evaluation key, Licensee may use the Software only in a non‑production environment for the shorter of **30 days** or the period stated in the evaluation key.  The Evaluation License is provided *“AS IS”* without warranty or support and may be terminated by OpenObserve at any time.

---

## 3. LICENSE RESTRICTIONS

Licensee shall not, and shall not permit any third party to:

1. Copy the Software or Documentation except for reasonable backup;
2. Modify, adapt, translate, or create derivative works of the Software;
3. Reverse‑engineer, decompile, or disassemble the Software except to the limited extent allowed by applicable law **and** after providing 30 days’ prior written notice to OpenObserve;
4. Rent, lease, lend, sell, sublicense, or provide the Software to third parties (including as part of MSP, SaaS, or hosting services);
5. Remove proprietary notices;
6. Use the Software in violation of export laws or **in connection with High‑Risk Activities**; or
7. Interfere with telemetry, metering, or license‑enforcement mechanisms, or fail to install Updates that contain security or license‑compliance fixes;
8. Use the Software to process data subject to the U.S. Children’s Online Privacy Protection Act (COPPA) or similar laws protecting children’s data;
9. Store or process data that is regulated as **Protected Health Information under HIPAA**, **cardholder data under PCI‑DSS**, or any other category of sensitive personal data requiring heightened statutory or contractual safeguards, unless the parties have executed a separate written addendum expressly permitting such use.

---

## 4. OPEN‑SOURCE COMPONENTS & CONTRIBUTIONS

The Software incorporates numerous open‑source libraries (“**Open‑Source Components**”).  A continuously updated list, including license texts and source‑code offers where required, is available under **Help ▸ About ▸ Open‑Source Notices** and in the distributed *NOTICE* file (which includes a link to [https://openobserve.ai/source](https://openobserve.ai/source) for obtaining complete corresponding source‑code where required).  Open‑Source Components remain under their respective licenses; this EULA does not override those terms.

If Licensee submits code, patches, or documentation (“**Contributions**”) to OpenObserve, Licensee grants OpenObserve a perpetual, worldwide, irrevocable, royalty‑free license to use, reproduce, modify, and distribute such Contributions under any license, including proprietary licenses, with no obligation to provide attribution or compensation.

---

## 5. USAGE MONITORING, PRIVACY & AUDIT

### 5.1  Telemetry & Usage Data

The Software transmits Usage Data (e.g., ingestion metrics, cluster ID, and business contact info) to OpenObserve for license enforcement, product improvement, and support.  Usage Data **does not include log contents**.  Where Usage Data contains Personal Data, OpenObserve acts as an **independent data controller** and processes such data in accordance with its [Privacy Policy](https://openobserve.ai/privacy).  **If, and only if, OpenObserve processes Personal Data on Licensee’s behalf (e.g., during a support session), the parties will execute OpenObserve’s Data Processing Addendum, under which OpenObserve acts as a processor.**  Licensee may request a telemetry‑free "zero‑call‑home" key, subject to periodic self‑reporting of usage metrics.  OpenObserve relies on its **legitimate interests in license enforcement and product improvement** as the lawful basis for such processing under GDPR Article 6(1)(f).  OpenObserve has conducted a balancing test and determined that these legitimate interests are not overridden by the rights and freedoms of data subjects.

### 5.2  Audit Right & Self‑Help

OpenObserve may audit compliance **during the Subscription Term and for three (3) years thereafter**.  Licensee shall cooperate and provide reasonable assistance.  If Licensee refuses an audit or material non‑compliance is discovered (>5 % overage or intentional circumvention), OpenObserve may **remotely disable** the relevant License Key(s) **only after 30 days’ written notice** (or **10 days in cases of proven fraud or willful circumvention**), \*or immediately and without prior notice if continued operation of the Software creates an \****imminent threat to the security, integrity, or availability of OpenObserve’s systems or services***, if Licensee fails to cure or enter a remediation plan.  Remote disable will not affect Licensee’s read‑only access to data ingested prior to the disablement.  **Licensee must pay any audit true‑up invoice within fifteen (15) days of issuance.**

---

## 6. SUPPORT, UPDATES & SERVICE LEVELS

*Paid subscribers* receive Support Services at the level purchased, subject to the **OpenObserve Enterprise Support & SLA Policy** (“Support Policy”), which specifies severity definitions, target response times, and service credits.  Free‑Tier and Evaluation users are **not** entitled to Support Services or SLAs.

OpenObserve will provide generally released patches and versions (“**Updates**”) during the Subscription Term.  Licensee must install Updates that OpenObserve designates as **“Critical Security”** within 90 days; **failure to do so constitutes a material breach of this EULA and may result in key disablement pursuant to §5.2.**

---

## 7. FEES & TAXES

All fees are due net 30 days from invoice, non‑cancellable, and non‑refundable except as expressly stated.  Fees exclude all taxes; Licensee is responsible for any duties, VAT, GST, or similar taxes, excluding taxes on OpenObserve’s net income.  If withholding tax is required, Licensee shall gross‑up the payment so OpenObserve receives the full invoiced amount.

---

## 8. WARRANTIES, DISCLAIMERS & HIGH‑RISK ACTIVITIES

### 8.1  Limited Performance Warranty

For **30 days** after first delivery of a paid License Key, the Software will materially conform to the Documentation.  OpenObserve’s sole obligation and Licensee’s exclusive remedy for breach is (i) repair or replacement of the non‑conforming Software, or (ii) a refund of unamortized fees **together with any service credits expressly provided in the Support Policy**.

### 8.2  Disclaimer

EXCEPT AS EXPRESSLY PROVIDED IN §8.1, THE SOFTWARE, SUPPORT, AND DOCUMENTATION ARE PROVIDED **“AS IS”** WITHOUT WARRANTIES OF ANY KIND, AND ALL IMPLIED WARRANTIES (INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON‑INFRINGEMENT) ARE DISCLAIMED TO THE MAXIMUM EXTENT PERMITTED BY LAW.

### 8.3  High‑Risk Activities

THE SOFTWARE IS NOT DESIGNED FOR HIGH‑RISK ACTIVITIES.  LICENSEE ASSUMES ALL RISK ARISING OUT OF ANY SUCH USE, AND OPENOBSERVE DISCLAIMS ANY LIABILITY THEREFOR.

### 8.4  Statutory Rights

Nothing in this EULA excludes or limits rights that cannot be excluded under applicable consumer‑protection law; to that extent, this EULA shall be construed so as to comply with such laws.

---

## 9. INDEMNIFICATION

### 9.1  OpenObserve IP Indemnity

OpenObserve will defend Licensee against claims that the unmodified Software directly infringes a U.S. patent, registered trademark, or copyright, or misappropriates a trade secret (“**Claim**”), and will indemnify Licensee for damages finally awarded or settled.  If the Software is enjoined, OpenObserve may procure a license, modify, or replace the Software, or refund unused prepaid fees and terminate the license.

### 9.2  Exclusions

OpenObserve’s obligations do not apply to Claims arising from (a) Open‑Source Components, (b) combination with anything not supplied by OpenObserve, (c) modification by anyone other than OpenObserve, or (d) use after OpenObserve has notified Licensee to stop.

### 9.3  Licensee Indemnity

Licensee will defend and indemnify OpenObserve from claims arising out of (a) Licensee’s breach of §§3 or 5, or (b) Licensee’s negligence or willful misconduct.

### 9.4  Patent Retaliation

If Licensee (or any Affiliate) initiates or voluntarily participates in a patent‑infringement lawsuit alleging that the Software, an Update, or any Open‑Source Component of the Software infringes a patent held by Licensee, **all licenses granted to Licensee under this EULA automatically terminate as of the filing date of such lawsuit.**

---

## 10. LIMITATION OF LIABILITY

NEITHER PARTY WILL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES OR LOST PROFITS.  EXCEPT FOR (i) BREACH OF §3, (ii) FEES DUE, OR (iii) INDEMNIFICATION OBLIGATIONS, EACH PARTY’S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID (IF ANY) BY LICENSEE UNDER THIS EULA IN THE **12 MONTHS** PRECEDING THE CLAIM.

---

## 11. TERM & TERMINATION

### 11.1  Term

This EULA is effective on the earlier of download, installation, or use and continues (a) for Free‑Tier users, until terminated; or (b) for paid users, through the Subscription Term.

### 11.2  Termination for Cause or Convenience

Either party may terminate for material breach not cured within **30 days** of written notice.  OpenObserve may terminate a **Free‑Tier License** for convenience on 30 days’ notice.  Upon termination, Licensee must cease all use, destroy copies, and certify destruction.  §§1, 3‑6, 8.2‑8.4, 9‑10, 11.2, and 12‑15 (including all disclaimers, limitations of liability, and indemnities) survive.

---

## 12. EXPORT & SANCTIONS COMPLIANCE

Licensee represents that it, its Affiliates, and its ultimate beneficial owners are **not** (a) located in or a national of any country subject to U.S. embargo, or (b) on any U.S. government denied‑party list.  Licensee will not export or permit access to the Software in violation of U.S. or other applicable export laws.

---

## 13. U.S. GOVERNMENT END USERS

The Software and Documentation are “commercial computer software” as defined in FAR 2.101 and DFARS 252.227‑7014.  Government end users acquire only those rights set forth in this EULA.

---

## 14. AMENDMENT & WAIVER

### 14.1  Amendment

OpenObserve may modify this EULA **for Free‑Tier and Evaluation users at any time** by posting an updated version; continued use after the effective date constitutes acceptance.  For paid Subscription Licenses, amendments become effective **only upon renewal** or execution of a new Order unless the change is required by law or relates to security/privacy.

### 14.2  Waiver & Severability

Failure to enforce any provision is not a waiver.  If any provision is held unenforceable, it will be modified to the minimum extent necessary and the remainder will remain in force.

---

## 15. ASSIGNMENT, FORCE MAJEURE & NOTICES

Licensee may not assign this EULA without OpenObserve’s prior written consent.  OpenObserve may assign freely.  Neither party is liable for delays caused by events beyond its reasonable control (“Force Majeure”).  Notices must be in writing and deemed given when delivered by courier or email with confirmation.

---

© 2025 OpenObserve Inc.  All rights reserved.
