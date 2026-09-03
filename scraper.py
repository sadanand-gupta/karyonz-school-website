"""
Scraper for Karyonz Play School, Singampunari.

Attempts to pull public listing text (address, phone, hours) and reviews
from Justdial and Google search snippets, and saves everything to
scraped_content.txt.

NOTE: Justdial and Google Maps both run active bot-detection (they block
requests even with browser-like headers, usually with a 403 or a CAPTCHA
page instead of real content). This script is written to run correctly and
will tell you plainly when a source blocks it, instead of silently saving
garbage/error HTML into the output file.
"""

import re
import time
import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

OUTPUT_FILE = "scraped_content.txt"


def fetch(url: str) -> requests.Response | None:
    """GET a URL with browser-like headers. Returns None on failure."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        return resp
    except requests.RequestException as exc:
        print(f"  ! Request failed for {url}: {exc}")
        return None


def scrape_justdial(search_url: str) -> str:
    """Try to pull a Justdial listing page. Returns human-readable text or a note explaining failure."""
    print(f"Fetching Justdial: {search_url}")
    resp = fetch(search_url)
    if resp is None:
        return "Justdial: request failed (network/connection error).\n"
    if resp.status_code != 200:
        return (
            f"Justdial: blocked bot traffic (HTTP {resp.status_code}). "
            "Justdial serves a CAPTCHA/anti-bot page to non-browser requests, "
            "so no listing data could be retrieved automatically.\n"
        )

    soup = BeautifulSoup(resp.text, "html.parser")
    text = soup.get_text(separator="\n", strip=True)
    if not text or "captcha" in text.lower():
        return "Justdial: page returned but looked like a CAPTCHA/blocked page, no usable data.\n"
    return text[:3000]  # cap output, page is noisy


def main():
    lines = []
    lines.append("=" * 60)
    lines.append("KARYONZ PLAY SCHOOL, SINGAMPUNARI - SCRAPED CONTENT")
    lines.append("=" * 60)
    lines.append("")

    # --- Justdial ---
    lines.append("--- JUSTDIAL ---")
    jd_url = "https://www.justdial.com/Sivaganga/Schools-in-Singampunari/nct-10422444"
    lines.append(scrape_justdial(jd_url))
    lines.append("")

    time.sleep(1)  # be polite between requests

    # --- Manual fallback note ---
    lines.append("--- NOTES ---")
    lines.append(
        "Google Maps and Facebook do not serve usable data to plain "
        "requests+BeautifulSoup scrapers (both require a logged-in, "
        "JS-executing browser and actively block automated clients). "
        "For those two sources, pull the details manually:\n"
        "  Facebook: https://www.facebook.com/people/Karyonz-School/100063749422618/\n"
        "  Google Maps: search 'Karyonz Play School Singampunari'\n"
    )

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"\nDone. Output written to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
