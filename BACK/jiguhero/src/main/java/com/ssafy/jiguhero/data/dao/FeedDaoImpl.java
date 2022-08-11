package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.data.entity.Like_Feed;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;

@Component
public class FeedDaoImpl implements FeedDao{

    private final MissionRepository missionRepository;
    private final LikeMissionRepository likeMissionRepository;
    private final ConnMissionRepository connMissionRepository;
    private final FeedRepository feedRepository;
    private final LikeFeedRepository likeFeedRepository;

    @Autowired
    public FeedDaoImpl(MissionRepository missionRepository, LikeMissionRepository likeMissionRepository, ConnMissionRepository connMissionRepository, FeedRepository feedRepository, LikeFeedRepository likeFeedRepository) {
        this.missionRepository = missionRepository;
        this.likeMissionRepository = likeMissionRepository;
        this.connMissionRepository = connMissionRepository;
        this.feedRepository = feedRepository;
        this.likeFeedRepository = likeFeedRepository;
    }

    @Override
    public Feed selectFeedById(Long feedId){
        Feed selectedFeed = feedRepository.findByFeedId(feedId);

        return selectedFeed;
    }

    @Override
    public Like_Feed selectLikeFeedByUser(Feed feed, User user){
        Like_Feed selectedFeed = likeFeedRepository.findByFeedAndUser(feed, user);

        return selectedFeed;
    }

    @Override
    public int countByFeed(Feed feed){
        int cnt = likeFeedRepository.countAllByFeed(feed);

        return cnt;
    }

    @Override
    public void insertFeed(Feed feed){
        feedRepository.save(feed);

    }

    @Override
    public Optional<Feed> selectFeed(Long feedId, User user){
        Optional<Feed> result = null;
        result = feedRepository.findByFeedIdAndUserAndRegtime(feedId, user, LocalDate.now());
        if(result.isPresent()) return result;
        else return null;
    }

    @Override
    public Feed updateFeed(FeedDto feedDto) throws Exception{
        Optional<Feed> selectedFeed = feedRepository.findById(feedDto.getFeedId());
        Feed updatedFeed;

        if(selectedFeed.isPresent()) {
            Feed feed = selectedFeed.get();
            feed.setContent(feedDto.getContent());

            updatedFeed = feedRepository.save(feed);
        }
        else {
            throw new Exception();
        }

        return updatedFeed;
    }

    @Override
    public Optional<Feed> searchFeed(User user){
        Optional<Feed> result = null;
        result = feedRepository.findByUserAndRegtime(user, LocalDate.now());
        if(result.isPresent()) return result;
        else return null;
    }

    @Override
    public Optional<Feed> selectFeed(Mission mission, User user){
        Optional<Feed> result = null;
        result = feedRepository.findByMissionAndUserAndRegtime(mission, user, LocalDate.now());
        if(result.isPresent()) return result;
        else return null;
    }

    @Override
    public void deleteLikeFeed(Feed feed){
        likeFeedRepository.deleteAllByFeed(feed);
    }

    @Override
    public void deleteFeed(Long feedId){
        feedRepository.deleteById(feedId);
    }

    @Override
    public int countByFeed(Mission mission, User user){
        int cnt = feedRepository.countAllByMissionAndUser(mission, user);

        return cnt;
    }
}
