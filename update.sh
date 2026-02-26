#!/bin/bash
# Energy News Update Script
# 1. Fetch and save today's energy news
# 2. Delete files older than 7 days

NEWS_DIR="/Users/sse/.openclaw/workspace/news"
TODAY=$(date +%Y-%m-%d)

# Delete files older than 7 days
find "$NEWS_DIR" -name "*.json" -type f -mtime +7 -delete
echo "Cleaned up old news files"

# The actual news fetching will be done by the cron job agent
echo "Ready for daily update"
